<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory, SoftDeletes;


    protected $fillable = [
        'name',
        'description',
        'thumbnail',
        'repository_url',
        'live_url',
        'technologies_id'
    ];



    public function technologies(): HasMany
    {
        return $this->hasMany(Technology::class, 'id', 'technologies_id');
    }
}
