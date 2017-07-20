<?php
/**
 * Created by PhpStorm.
 * User: Heath
 * Date: 12/09/16
 * Time: 7:05 PM
 */
class HappTag extends DataObject
{

    private static $has_many = array(
        'SecondaryTags'   =>  'SecondaryTag'
    );

    private static $db = array(
        'Title' => 'Varchar(100)',
        'Description' => 'Text'
    );

    public function getCMSFields(){
        $fields = parent::getCMSFields();
        return $fields;
    }

}