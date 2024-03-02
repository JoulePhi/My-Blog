<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes, HasUlids;

    protected $fillable = [
        'user_id',
        'title',
        'content',
        'meta_title',
        'thumbnail',
        'slug',
        'is_published',
        'published_at',

    ];
}
