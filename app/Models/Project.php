<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory, SoftDeletes, HasUlids;


    protected $fillable = [
        'name',
        'description',
        'thumbnail',
        'repository_url',
        'live_url',
        'technologies_id'
    ];



    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class, 'project_technology');
    }
}
