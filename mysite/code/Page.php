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
	    'searchHappEvents'
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

        Requirements::javascript('http://maps.google.com/maps/api/js?key=AIzaSyBWVd4651hNv8mOn-RaHZdC166O82S-BbY&sensor=false&libraries=places');
//        Requirements::javascript($this->ThemeDir() . "/js/scripts/locationpicker.jquery.min.js");

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
