<?php

/**
 * Created by PhpStorm.
 * User: Heath
 * Date: 13/02/17
 * Time: 9:24 PM
 */
class HappSiteConfig extends DataExtension
{
    private static $db = array(
        'ClientColor' => 'Varchar(20)',
        'SecondBarColor' => 'Varchar(20)',
        'MonthTxtColor' =>  'Varchar(20)',
        'MonthArrowsColor' =>  'Varchar(20)',
        'EventBackgroundColor' => 'Varchar(20)',
        'EventBackgroundHoverColor' => 'Varchar(20)',
        'LetterColor'   =>  'Varchar(20)',
        'LetterHoverColor'  =>  'Varchar(20)',
        'CurrentDayColor'   =>  'Varchar(20)',
        'DayNumberColor'   =>  'Varchar(20)',
        'CurrentDayBackground'  =>  'Varchar(20)',
        'MenuIconColors'    =>  'Varchar(20)',
        'AddEventHeaderBGColor'    =>  'Varchar(20)',
        'AddEventHeaderTxtColor'    =>  'Varchar(20)',
        'AddEventBodyBGColor'    =>  'Varchar(20)',
        'CalendarPickerBGColor' =>  'Varchar(20)',
        'AddCloseBGColor'    =>  'Varchar(20)',
        'AddCloseIcoColor'    =>  'Varchar(20)',
        'EventHeaderBGColor'    =>  'Varchar(20)',
        'EventHeaderTxtColor'    =>  'Varchar(20)',
        'ModalLocationColor'    =>  'Varchar(20)',
        'EventModalIcoColors'   =>  'Varchar(20)',
        'EventCloseBGColor'    =>  'Varchar(20)',
        'EventCloseIcoColor'   =>  'Varchar(20)',
        'SearchCloseBGColor'    =>  'Varchar(20)',
        'SearchCloseIcoColor'   =>  'Varchar(20)',
        'SearchBtnBGColor'    =>  'Varchar(20)',
        'SearchBtnIcoColor'   =>  'Varchar(20)',
    );

    private static $has_one = array(
        'HappLogo' => 'Image',
        'ClientLogo' => 'Image'
    );

    public function updateCMSFields(FieldList $fields)
    {

        /** Colors
         * ClientColor
         */
        $fields->addFieldToTab('Root.Colors',
            TextField::create('ClientColor', 'Client Color')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // SecondBarColor
        $fields->addFieldToTab('Root.Colors',
            TextField::create('SecondBarColor', 'second bar containing the days')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // MonthTxtColor
        $fields->addFieldToTab('Root.Colors',
            TextField::create('MonthTxtColor', 'Month Text color for top bar')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // MonthArrowsColor
        $fields->addFieldToTab('Root.Colors',
            TextField::create('MonthArrowsColor', 'Month Arrows Indicator Color')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // MenuIconColors
        $fields->addFieldToTab('Root.Colors',
            TextField::create('MenuIconColors', 'Color for the menu Icons, search, add, filter')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // EventBackgroundColor
        $fields->addFieldToTab('Root.Colors',
            TextField::create('EventBackgroundColor', 'event background color')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // EventBackgroundHoverColor
        $fields->addFieldToTab('Root.Colors',
            TextField::create('EventBackgroundHoverColor', 'event background hover stop')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // LetterColor
        $fields->addFieldToTab('Root.Colors',
            TextField::create('LetterColor', 'Letter Color for the events')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // LetterHoverColor
        $fields->addFieldToTab('Root.Colors',
            TextField::create('LetterHoverColor', 'Letter Hover Color for the events')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // CurrentDayColor
        $fields->addFieldToTab('Root.Colors',
            TextField::create('CurrentDayColor', 'Current Day number color')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // CurrentDayBackground
        $fields->addFieldToTab('Root.Colors',
            TextField::create('CurrentDayBackground', 'Background color for the current day')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        //DayNumberColor
        $fields->addFieldToTab('Root.Colors',
            TextField::create('DayNumberColor', 'Color for the day number on events')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));

        /* ADD EVENT MODAL */
        // AddEventHeaderBGColor
        $fields->addFieldToTab('Root.AddEventModalColors',
            TextField::create('AddEventHeaderBGColor', 'Background Color for the header strip')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // AddEventHeaderTxtColor
        $fields->addFieldToTab('Root.AddEventModalColors',
            TextField::create('AddEventHeaderTxtColor', 'Text color for the header strip')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // AddEventBodyBGColor
        $fields->addFieldToTab('Root.AddEventModalColors',
            TextField::create('AddEventBodyBGColor', 'Background color for the modal body')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // CalendarPickerBGColor
        $fields->addFieldToTab('Root.AddEventModalColors',
            TextField::create('CalendarPickerBGColor', 'Background color for the calendar date picker')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));


        // AddCloseBGColor
        $fields->addFieldToTab('Root.AddEventModalColors',
            TextField::create('AddCloseBGColor', 'Background Color for the close icon')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // AddCloseIcoColor
        $fields->addFieldToTab('Root.AddEventModalColors',
            TextField::create('AddCloseIcoColor', 'Icon Color for close button')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));

        /* EVENT MODAL */
        // EventHeaderBGColor
        $fields->addFieldToTab('Root.EventModalColors',
            TextField::create('EventHeaderBGColor', 'Background Color for the header strip')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // EventHeaderTxtColor
        $fields->addFieldToTab('Root.EventModalColors',
            TextField::create('EventHeaderTxtColor', 'Color the header strips text')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // ModalLocationColor
        $fields->addFieldToTab('Root.EventModalColors',
            TextField::create('ModalLocationColor', 'Color For the Location Icon on the event modal')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // EventModalIcoColors
        $fields->addFieldToTab('Root.EventModalColors',
            TextField::create('EventModalIcoColors', 'Color for the icons on the event modal')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // EventCloseBGColor
        $fields->addFieldToTab('Root.EventModalColors',
            TextField::create('EventCloseBGColor', 'Background Color for close event modal')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // EventCloseIcoColor
        $fields->addFieldToTab('Root.EventModalColors',
            TextField::create('EventCloseIcoColor', 'Color for close event modal icon')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));

        /* SEARCH MODAL */
        // SearchCloseBGColor
        $fields->addFieldToTab('Root.SearchModalColors',
            TextField::create('SearchCloseBGColor', 'Color the search close background color')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // SearchCloseIcoColor
        $fields->addFieldToTab('Root.SearchModalColors',
            TextField::create('SearchCloseIcoColor', 'Color the search close Icon color')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // SearchBtnBGColor
        $fields->addFieldToTab('Root.SearchModalColors',
            TextField::create('SearchBtnBGColor', 'Color the search background Icon color')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));
        // SearchBtnIcoColor
        $fields->addFieldToTab('Root.SearchModalColors',
            TextField::create('SearchBtnIcoColor', 'Color the search Icon color')
                ->setDescription('Please enter rgb or hex value as varchar e.g #425968 or rgba(66,89,104)'));

        // Logos
        $fields->addFieldToTab("Root.Logos",
            UploadField::create('HappLogo', 'Happ Logo')
                ->setDescription('The Happ Logo goes here')
                ->setFolderName('Logos')
        );
        $fields->addFieldToTab("Root.Logos",
            UploadField::create('ClientLogo', 'The client logo goes here')
                ->setDescription('Please put the client logo here')
                ->setFolderName('Logos')
        );

    }
}