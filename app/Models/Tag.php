<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model
{
    use HasFactory, SoftDeletes, HasUlids;

    protected $fillable = [
        'title',
        'meta_title',
        'slug',
        'content',
    ];

    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class,'post_tags');
    }
}
