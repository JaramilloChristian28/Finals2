<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $table = 'patients';  // Specify the table name
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'email',
        'age',
    ];
}
