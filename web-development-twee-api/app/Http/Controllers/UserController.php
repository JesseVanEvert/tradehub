<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function storeUser(Request $request)
    {
        $user = User::create($request->all());

        return response()->json($user, 201);
    }

    public function retrieveSpecificUser($id)
    {
        $user = User::find($id);

        return response()->json($user, 200);
    }
}
