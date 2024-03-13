<?php

namespace App\Services\CRUD;

use App\Models\Technology;
use Exception;
use Illuminate\Support\Facades\DB;

class TechnologyService
{
    /**
     * @throws Exception
     */
    public function create($data, $logo)
    {
        DB::beginTransaction();
        try {

            $data['logo'] = $logo;
            $technology = Technology::create($data);
            DB::commit();
            return $technology;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * @throws Exception
     */
    public function update($id, $data, $image)
    {
        DB::beginTransaction();
        try {
            $data['logo'] = $image;
            $comment =  Technology::where('id', $id)->update($data);
            DB::commit();
            return  $comment;
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
            $comment =  Technology::where('id', $id)->delete();
            DB::commit();
            return  $comment;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function get($id)
    {
        return Technology::where('id', $id)->first();
    }
}
