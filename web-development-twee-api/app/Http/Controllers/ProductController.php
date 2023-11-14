<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    
    public function storeProduct(Request $request)
    {

        //Check if fields are empty
        if (!$request->name || !$request->description || !$request->price || !$request->quantity_listed || !$request->category_id || !$request->user_id) {
            return response()->json([
                'message' => 'Please fill all the fields'
            ], 404);
        }

        $product = Product::create($request->all());

        $quantityListed = $request->quantity_listed;
        $price = $request->price;
        
        if($price < 0) {
            return response()->json([
                'message' => 'Price cannot be negative'
            ], 404);
        }
        
        $product->users()->attach($request->user_id, ['quantity_bought' => 0, 'quantity_listed' => $quantityListed, 'is_on_wishlist' => false]);

        return response()->json($product, 201);
    }

    public function buyProduct(Request $request) 
    {
        $product = Product::find($request->product_id);
        $quantityBought = $request->quantity_bought;
        
        $quantityListed = null;

        //Add the quantity listed to the product
        foreach ($product->users as $user) {
            if ($user->pivot->user_id == $request->seller_id) {
                $quantityListed = $user->pivot->quantity_listed;
            }
        }

        //Throw error if buyer and seller are the same person
        if ($request->buyer_id == $request->seller_id) {
            return response()->json([
                'message' => 'You cannot buy your own product'
            ], 404);
        }
        
        if ($quantityBought > $quantityListed) {
            return response()->json([
                'message' => 'Not enough quantity listed'
            ], 404);
        }

        $product->users()->attach($request->buyer_id, ['quantity_bought' => $quantityBought, 'quantity_listed' => 0, 'is_on_wishlist' => false]);
        $product->users()->updateExistingPivot($request->seller_id, ['quantity_listed' => $quantityListed - $quantityBought]);

        return response()->json($product, 201);
    }

    //return sold products history including the quantity of the product sold and to who it was sold
    public function showSoldProductsHistory($seller_id) {
        $products = Product::whereHas('users', function ($query) use ($seller_id) {
            $query->where('user_id', $seller_id);
        })->whereHas('users', function ($query) {
            $query->where('quantity_bought', '>', 0);
        })->get();

        //Show to who the product was sold  
        foreach ($products as $product) {
            $product->buyer_id = $product->users()->where('quantity_bought', '>', 0)->first()->id;
        }

        //Add buyer name to the product
        foreach ($products as $product) {
            $product->buyer_name = $product->users()->where('quantity_bought', '>', 0)->first()->name;
        }

        //Show the quantity sold
        foreach ($products as $product) {
            $product->quantity_bought = $product->users()->where('quantity_bought', '>', 0)->first()->pivot->quantity_bought;
        }

        return response()->json($products);
    }

    //Show all products with a quantity listed greater than 0
    public function showAllProducts()
    {
        $products = Product::whereHas('users', function ($query) {
            $query->where('quantity_listed', '>', 0);
        })->get();

        //Include the id of the seller
        foreach ($products as $product) {
            $product->seller_id = $product->users()->where('quantity_listed', '>', 0)->first()->id;
        }

        //Include the name of the seller
        foreach ($products as $product) {
            $product->seller_name = $product->users()->where('quantity_listed', '>', 0)->first()->name;
        }

        return response()->json($products);
    }

    //Show products by category with a quantity listed greater than 0
    public function showProductsByCategory($categoryId)
    {
        $products = Product::where('category_id', $categoryId)->whereHas('users', function ($query) {
            $query->where('quantity_listed', '>', 0);
        })->get();

        //Include the id of the seller
        foreach ($products as $product) {
            $product->seller_id = $product->users()->where('quantity_listed', '>', 0)->first()->id;
        }

        //Include the name of the seller
        foreach ($products as $product) {
            $product->seller_name = $product->users()->where('quantity_listed', '>', 0)->first()->name;
        }

        return response()->json($products);
    }

    public function showSpecificProduct($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json($product);
    }

    public function updateProduct(Request $request)
    {
        $product = Product::find($request->product_id);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }

        $product->update($request->all());

        return response()->json($product);
    }
}
