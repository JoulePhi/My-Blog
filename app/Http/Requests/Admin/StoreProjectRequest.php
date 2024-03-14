<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'repository_url' => ['required', 'string', 'url'],
            'live_url' => ['string', 'url', 'nullable'],
            'technologies' => ['required', 'array'],
            'technologies.*' => ['required', 'string', 'exists:technologies,id'],
            'thumbnail' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ];
    }
}
