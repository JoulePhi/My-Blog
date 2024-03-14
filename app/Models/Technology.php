<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Technology extends Model
{
    use HasFactory, SoftDeletes, HasUlids;

    protected $fillable = [
        'name',
        'description',
        'logo'
    ];


    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class, 'project_technology');
    }
}
