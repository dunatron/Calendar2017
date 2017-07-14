<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 17/02/17
 * Time: 1:13 PM
 */
class EventFindaImage extends DataObject
{
    private static $has_one = array(
        'Event' =>  'Event'
    );

    private static $db = array(
        'Title' => 'Text',
        'URL'   =>  'Text',
        'transformation_id' => 'int'
    );

    public function getCMSFields(){
        $fields = parent::getCMSFields();
        return $fields;
    }
}
