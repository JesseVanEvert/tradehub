<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'category_id',
        'price',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class)
            ->withPivot(['quantity_bought', 'quantity_listed', 'is_on_wishlist']);
    }
}
