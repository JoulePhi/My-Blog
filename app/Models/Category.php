<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes, HasUlids;

    protected $fillable = [
        'title',
        'meta_title',
        'slug',
    ];

    public function postCategories(): HasMany
    {
        return $this->hasMany(PostCategory::class, 'category_id', 'id');
    }

}
