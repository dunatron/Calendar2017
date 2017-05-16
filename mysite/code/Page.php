<?php
class Page extends SiteTree {

	private static $db = array(
	);

	private static $has_one = array(
	);

}
class Page_Controller extends ContentController {

	/**
	 * An array of actions that can be accessed via a request. Each array element should be an action name, and the
	 * permissions or conditions required to allow the user to access it.
	 *
	 * <code>
	 * array (
	 *     'action', // anyone can access this action
	 *     'action' => true, // same as above
	 *     'action' => 'ADMIN', // you must have ADMIN permissions to access this action
	 *     'action' => '->checkAction' // you can only access this action if $this->checkAction() returns true
	 * );
	 * </code>
	 *
	 * @var array
	 */
	private static $allowed_actions = array (
	    'HappSearchForm',
	    'searchHappEvents',
        'HappEventForm',
        'processHappEvent'
	);

	public function init() {
		parent::init();
        Requirements::clear();
        $themeFolder = $this->ThemeDir();

        // Set the folder to our theme so that relative image paths work
        Requirements::set_combined_files_folder($themeFolder . '/combinedfiles');

        // Add all our css files to combine into an array
        $CSSFiles = array(
            //$themeFolder . '/css/base-styles.css',
            $themeFolder . '/css/Calendar-Core.css',
            $themeFolder . '/css/homepage.css',
            $themeFolder . '/css/main.css'
        );


//        Requirements::javascript('http://maps.google.com/maps/api/js?key=AIzaSyBWVd4651hNv8mOn-RaHZdC166O82S-BbY&sensor=false&libraries=places');
        //Requirements::javascript($this->ThemeDir() . "/js/scripts/locationpicker.jquery.min.js");

        // Add all our files to combine into an array
        $JSFiles = array(
            $themeFolder . '/js/scripts/vendor/jquery-3.2.1.min.js',
            $themeFolder . '/js/scripts/vendor/bootstrap3.3.7.min.js',
            $themeFolder . '/js/scripts/vendor/svg-core.min.js',
            $themeFolder . '/js/scripts/vendor/select2.min.js',
            $themeFolder . '/js/scripts/vendor/locationpicker.jquery.min.js',
            $themeFolder . '/js/scripts/vendor/jquery.bxslider.min.js',
            $themeFolder . '/js/scripts/all.js',
        );
        // Combine css files
        Requirements::combine_files('styles.css', $CSSFiles);

        // Combine js files
        Requirements::combine_files('scripts.js', $JSFiles);
	}

    public function HappEventForm()
    {
        // Details Fields
        $detailsStart = LiteralField::create('DetailsStart', '<div id="details-step" class="form-step">');
        $title = TextField::create('EventTitle', 'Title of the Event')
            ->setAttribute('required', true)
            ->setAttribute('v-model', 'AddEventForm.Title')
            ->setAttribute('v-validate', 'AddEventForm.Title')
            ->setAttribute('data-v-rules', 'required')
            ->setAttribute('placeholder', 'Title');

        $titleError = LiteralField::create('titleError', '<p class="text-danger" v-if="errors.has(\'AddEventForm.Title\')">{{ errors.first(\'AddEventForm.Title\') }}</p>');
        //$titleError = LiteralField::create('titleError', '<p class="text-danger">Error field???</p>');

        $desc = TextareaField::create('EventDescription', 'description of the event');
        $ticket = CheckboxField::create('HasTickets', 'Check if event has tickets')->setAttribute('id', 'hasTickets');
//        $tags = MultiValueCheckboxField::create(
//            'EventTags',
//            'Check relevant Tags',
//            Tag::get()->map('ID', 'Title')->toArray(),
//            null,
//            true
//        );
        $detailsNext = LiteralField::create('detailsNextBtn', '<div class="add-event-controls"><div id="detailsNextBtn" class="add-event-next"><span>next</span></div></div>');
        $detailsEnd = LiteralField::create('DetailsEnd', '</div>');

        // Ticket Step
        $ticketStart = LiteralField::create('TicketStart', '<div id="ticket-step" class="form-step field-hidden">');
        $restrictions = DropdownField::create('Restriction',
            'Restrictions for event',
            EventRestriction::get()->map('ID', 'Description')->toArray(),
            null,
            true
        );

        $acc = new AccessTypeArray();
        $acc->getAccessValues();
        $ticketBack = LiteralField::create('ticketBackBtn', '<div class="add-event-controls"> <div id="ticketBackBtn" class="add-event-back"><span>back</span></div>');
        $ticketNext = LiteralField::create('ticketNextBtn', '<div id="ticketNextBtn" class="add-event-next"><span>next</span></div></div>');

        $access = $acc->getAccessValues();
        $ticketEnd = LiteralField::create('TicketEnd', '</div>');

        // Ticket Website (Option 5 is selected for radio option field)
        $ticWebStart = LiteralField::create('TicWebStart', '<div id="ticket-web-step" class="form-step field-hidden">');
        $website = TextField::create('TicketWebsite', 'Ticket website');
        $phone = TextField::create('TicketPhone', 'Ticket provider phone number');
        $ticketWebBack = LiteralField::create('ticketWebBack', '<div class="add-event-controls"><div id="ticketWebBack" class="add-event-back"><span>back</span></div>');
        $ticketWebNext = LiteralField::create('ticketWebNext', '<div id="ticketWebNext" class="add-event-next"><span>next</span></div></div>');
        $ticWebEnd = LiteralField::create('TicWebEnd', '</div>');

        // Location Step
        $locationStart = LiteralField::create('LocationStart', '<div id="location-step" class="form-step field-hidden">');
        $locationField = TextField::create('LocationText')->setAttribute('id', 'addEventAddress');
        $locLat = HiddenField::create('LocationLat', 'Location Latitude')->setAttribute('id', 'addEventLat');
        $locLong = HiddenField::create('LocationLon', 'Location Longitude')->setAttribute('id', 'addEventLon');
        $locRadius = HiddenField::create('LocationRadius', 'Radius of the event')->setAttribute('id', 'addEventRadius');
        $map = LiteralField::create('googleMap', '<div id="addEventMap" style="width: 100%; height: 400px;"></div>');
        $locationBack = LiteralField::create('LocationBack', '<div class="add-event-controls"><div id="locationBack" class="add-event-back"><span>back</span></div>');
        $locationNext = LiteralField::create('LocationNext', '<div id="locationNext" class="add-event-next"><span>next</span></div></div>');
        $locationEnd = LiteralField::create('LocationEnd', '</div>');

        // Date Step
        $dateStart = LiteralField::create('DateStart', '<div id="date-step" class="form-step field-hidden">');
        $date = DateField::create('EventDate', 'Date of the event')->setConfig('dateformat', 'dd-MM-yyyy')->setAttribute('type', 'date');
        $startTime = TextField::create('StartTime', 'Event start time')->addExtraClass('timepicker');
        $finishTime = TextField::create('FinishTime', 'Event finish time')->addExtraClass('timepicker');
        $dateBack = LiteralField::create('DateBack', '<div class="add-event-controls"><div id="dateBack" class="add-event-back"><span>back</span></div></div>');

        $dateEnd = LiteralField::create('DateEnd', '</div>');

        $fields = new FieldList(
            $detailsStart,
            $title,
            $titleError,
            $desc,
            $ticket,
            //$tags,
            $detailsNext,
            $detailsEnd,
            $ticketStart,
            $restrictions,
            $access,
            $ticketBack,
            $ticketNext,
            $ticketEnd,
            $ticWebStart,
            $website,
            $phone,
            $ticketWebBack,
            $ticketWebNext,
            $ticWebEnd,
            $locationStart,
            $locationField,
            $locLat,
            $locLong,
            $locRadius,
            $map,
            $locationBack,
            $locationNext,
            $locationEnd,
            $dateStart,
            $date,
            $startTime,
            $finishTime,
            $dateBack,
            $dateEnd
        );


        $actions = new FieldList(
            FormAction::create('processHappEvent', 'Submit')->addExtraClass('field-hidden happ_btn')->setAttribute('id', 'submitHappEvent')
        );

        $actions->push(
            ResetFormAction::create('ClearAction', 'Clear')
        );

        $form = Form::create($this, 'HappEventForm', $fields, $actions)->addExtraClass('happ-add-event-form');
        return $form;
    }

    public function processHappEvent($data, $form)
    {

        $tagIDS = [];
        $tags = $data['EventTags'];

        foreach ($tags as $key => $value) {
            array_push($tagIDS, $value);
        }
        $tagsAsString = implode(",", $tagIDS);

        $pageID = Session::get('CALID');
        $event = new Event();

        $event->update($data);
        $event->EventTags = $tagsAsString;
        $event->CalendarPageID = $pageID;
        $event->write();

        // Using the Form instance you can get / set status such as error messages.
        $form->sessionMessage("Successful!", 'good');

        // After dealing with the data you can redirect the user back.
        return $this->redirectBack();
    }

    public function HappSearchForm()
    {
        $searchField = TextField::create('keyword', 'Keyword search')->setAttribute('placeholder', 'Key-word search...');

        $collapseAdvancedToggle = LiteralField::create('AdvancedToggle', '<button data-toggle="collapse" data-target="#advancedSearch" id="advancedToggle">Advanced Search</button>');
        $advancedStart = LiteralField::create('advancedStart', '<div id="advancedSearch" class="collapse">');

        $pastOrFuture = OptionsetField::create('PastOrFuture', 'Select Past or Future filter', array(
            "1" => "Past",
            "2" => "Future",
            "3" => "ALL"
        ), $value = 2);

        $prioritiseTextOrDate = OptionsetField::create('DateOrText', 'prioritise keyword or closest date', array(
            "1" => "Date",
            "2" => "Keyword"
        ), $value = 2);

        $advancedEnd = LiteralField::create('advancedEnd', '</div>');
        $fields = FieldList::create(
            $searchField,
            $collapseAdvancedToggle,
            $advancedStart,
            $pastOrFuture,
            $prioritiseTextOrDate,
            $advancedEnd
        );
        $actions = FieldList::create(
            FormAction::create('searchHappEvents', 'Search')->addExtraClass('happ_btn')->setAttribute('id', 'falseSearchHappEvents')
        );

        $form = Form::create($this, 'HappSearchForm', $fields, $actions)->addExtraClass('happ-search-form');
        return $form;
    }

    /**
     * Do Happ search based on keyword, and advanced options
     * {Keyword, PastFuture, DateOrText}
     */
    public function searchHappEvents($data, $form = '')
    {
        //https://github.com/silverstripe/silverstripe-fulltextsearch/blob/master/docs/en/Solr.md
        $Search = '';
        $PastFutureQuery = 'EventDate:LessThan';
        $PastFutureDate = date('Y-m-d', strtotime(date('Y-m-d') . " -1 day"));

        if (isset($data['Keyword'])) {
            $Search = $data['Keyword'];
        }
        /**
         * For excluding events based on advanced search results
         */
        if (isset($data['PastFuture'])) {
            $yesterday = date('Y-m-d', strtotime(date('Y-m-d') . " -1 day"));
            $today = date('Y-m-d', strtotime(date('Y-m-d')));
            // exclude past events
            if ($data['PastFuture'] == 2) {
                $PastFutureQuery = 'EventDate:LessThan';
                $PastFutureDate = $yesterday;
            } // exclude events greater than today
            elseif ($data['PastFuture'] == 1) {
                $PastFutureQuery = 'EventDate:GreaterThan';
                $PastFutureDate = $today;
            } elseif ($data['PastFuture'] == 3) {
                $PastFutureQuery = 'EventTitle';
                $PastFutureDate = 'Pornography';
            }
        }

        /**
         * Search Index
         */
        $index = new HappIndex();
        $query = new SearchQuery();
        $query->inClass('Event');

        $query->search($Search);

        $params = array(
            'hl' => 'true'
        );
        $results = $index->search($query, -1, 20, $params); // third param is the amount of results in one go -1 not working. I think 9000 is a good base ;) ;) ;)

        $results->spellcheck;

        $ResultsList = ArrayList::create();
        $resultsIDArr = array();
        foreach ($results->Matches as $r) {
            {
                $ResultsList->add($r);
                array_push($resultsIDArr, $r->ID);
            }
        }

        $finalResults = '';
        /**
         * Determine what results set to use
         */
        if (isset($data['DateOrText'])) {
            // prioritise closest dates at the top
            if ($data['DateOrText'] == 1) {
                $finalResults = $events = Event::get()
                    ->byIDs($resultsIDArr)
                    ->where('EventApproved', 'TRUE')
                    ->exclude(array(
                        $PastFutureQuery => $PastFutureDate
                    ))
                    ->sort('ABS(UNIX_TIMESTAMP() - UNIX_TIMESTAMP(EventDate))');
            } // prioritise keyword at the top
            elseif ($data['DateOrText'] == 2) {
                $finalResults = $events = Event::get()
                    ->byIDs($resultsIDArr)
                    ->where('EventApproved', 'TRUE')
                    ->exclude(array(
                        $PastFutureQuery => $PastFutureDate
                    ));
            }
        }

        // If results list is empty, try a partial match
        if (empty($finalResults)) {
            if ($data['DateOrText'] == 1) {
                $finalResults = Event::get()
                    ->where('EventApproved', 'TRUE')
                    ->filter(array(
                        'EventTitle:PartialMatch' => $Search,
                        'EventDescription:PartialMatch' => $Search,
                    ))
                    ->limit(20)
                    ->exclude(array(
                        $PastFutureQuery => $PastFutureDate
                    ))
                    ->sort('ABS(UNIX_TIMESTAMP() - UNIX_TIMESTAMP(EventDate))');
            } elseif ($data['DateOrText'] == 2) {
                $finalResults = Event::get()
                    ->where('EventApproved', 'TRUE')
                    ->exclude(array(
                        $PastFutureQuery => $PastFutureDate
                    ))
                    ->limit(20)
                    ->filter(array(
                        'EventTitle:PartialMatch' => $Search,
                        'EventDescription:PartialMatch' => $Search,
                    ));
            }
        }

        $searchData = ArrayData::create(array(
            'Results' => $finalResults,
            'KeyWord' => $data['Keyword'],
        ));

        return $this->owner->customise($searchData)->renderWith('Search_Results');
    }

    public function getSearchSVG()
    {
        $theme = $this->ThemeDir();
        return file_get_contents('../' . $theme . '/svg/menu/search_icon.svg');
        //return file_get_contents('/Applications/MAMP/htdocs/home/calendar/themes/happ/svg/menu/search_icon.svg');// for Local MAMP development
    }

    public function getAddEventSVG()
    {
        $theme = $this->ThemeDir();
        return file_get_contents('../' . $theme . '/svg/menu/add_event_icon_1.svg');
    }

    public function getFilterSVG()
    {
        $theme = $this->ThemeDir();
        return file_get_contents('../' . $theme . '/svg/menu/filter_icon_1.svg');
    }

    // SVG
    // Clock SVG
    public function getClockSVG()
    {
        $theme = $this->ThemeDir();
        return file_get_contents('../' . $theme . '/svg/clock.svg');
    }

    // Ticket SVG
    public function getTicketSVG()
    {
        $theme = $this->ThemeDir();
        return file_get_contents('../' . $theme . '/svg/ticket.svg');
    }

    // Restrict SVG
    public function getRestrictSVG()
    {
        $theme = $this->ThemeDir();
        return file_get_contents('../' . $theme . '/svg/restrict.svg');
    }

    // Location SVG
    public function getLocationSVG()
    {
        $theme = $this->ThemeDir();
        return file_get_contents('../' . $theme . '/svg/location.svg');
    }

    // Calendar SVG
    public function getCalendarSVG()
    {
        $theme = $this->ThemeDir();
        return file_get_contents('../' . $theme . '/svg/calendar.svg');
    }

    // Close SVG
    public function getCloseSVG()
    {
        $theme = $this->ThemeDir();
        return file_get_contents('../' . $theme . '/svg/close.svg');
    }

}
