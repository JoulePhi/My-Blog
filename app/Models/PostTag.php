<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str ;

class PostTag extends Model
{
    use HasFactory, SoftDeletes, HasUlids;

    protected $table = 'post_tags';

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($model) {
            $model->{$model->getKeyName()} = (string) Str::ulid();
        });
    }
    protected $fillable = [
        'id',
        'post_id',
        'tag_id',
    ];


}
