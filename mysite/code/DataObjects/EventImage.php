<?php
//
//use SilverStripe\Assets\Image;
//use SilverStripe\ORM\FieldType\DBDate;
//use SilverStripe\ORM\FieldType\DBInt;
//use SilverStripe\Forms\TextField;
//use SilverStripe\Forms\NumericField;
//use SilverStripe\Forms\DropdownField;
//use SilverStripe\Forms\CheckboxField;
//use SilverStripe\AssetAdmin\Forms\UploadField;
//use SilverStripe\ORM\DataObject;
//use SilverStripe\Control\Controller;
//use SilverStripe\Forms\DateField;
//use SilverStripe\Forms\TimeField;
//use SilverStripe\Forms\GridField\GridFieldConfig_RecordEditor;
//use SilverStripe\Forms\GridField\GridField;
//use SilverStripe\Core\ClassInfo;
//
//class EventImage extends Image
//{
//    private static $db=array(
//        'transformation_id' => 'int'
//    );
//
//    private static $belongs_many_many = array(
//        "HappEventImages"   =>  'Event'
//    );
//
//
////    public static $has_one = array(
////        'Event' =>  'Event'
////    );
//
//    public function setFilename($val) {
//        $this->setField('Filename', $val);
//
//        // "Filename" is the "master record" (existing on the filesystem),
//        // meaning we have to adjust the "Name" property in the database as well.
//        //$this->setField('Name', basename($val));
//    }
//}