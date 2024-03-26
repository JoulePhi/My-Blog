<?php

namespace App\Services\CRUD;

use App\Models\About;
use Exception;
use Illuminate\Support\Facades\DB;

class AboutService
{
    /**
     * @throws Exception
     */
    public function create($data, $image, $cv)
    {
        DB::beginTransaction();
        try {
            $data['image'] = $image;
            $data['cv'] = $cv;
            $about = About::create($data);
            DB::commit();
            return $about;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * @throws Exception
     */
    public function update($id, $data, $image, $cv)
    {
        DB::beginTransaction();
        try {
            if ($image != null) {
                $data['image'] = $image;
            }
            if ($cv != null) {

                $data['cv'] = $cv;
            }
            $about =  About::where('id', $id)->update($data);
            DB::commit();
            return  $about;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * @throws Exception
     */
    public function delete($id)
    {
        DB::beginTransaction();
        try {
            $about =  About::where('id', $id)->delete();
            DB::commit();
            return  $about;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function get($id)
    {
        return About::where('id', $id)->first();
    }
}
