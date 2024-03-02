<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostCategory extends Model
{
    use HasFactory, SoftDeletes, HasUlids;

    protected $fillable = [
        'post_id',
        'category_id',
    ];
}
