<?php

use SilverStripe\View\Requirements;
use SilverStripe\View\ArrayData;
use SilverStripe\SiteConfig\SiteConfig;

class CalendarPage_Controller extends PageController
{

    //Inject assets through controller
    public function init()
    {
        parent::init();

        /**
         * Maybe try destroy sessionData onPage reload? something to discuss
         */

        /**
         * weirdly this works. maybe. Test later lmfao.
         */
        if(isset($_SESSION['EID']))
        {
            unset($_SESSION['EID']);
            $_SESSION['EID'] = 12;
        }

        $urlParams = $this->getURLParamaters();

        error_log(var_export($urlParams, true));

        /**
         * Because I am using webpack, we want this script in the head to style our document before the elements load.
         * Because of this make sure we are doing best practise and load our selectors etc after document ready.
         * This means exporting our javascript and vue modules etc properly as functions. meaning we import in our entry js file,
         * and the call the function in document ready
         */

        Requirements::set_write_js_to_body(false);

        if (isset($urlParams->Month)) {
            //$m = date("m", $urlParams->Month);
            //$m = date("m");
            $dateObj   = DateTime::createFromFormat('!m', $urlParams->Month);
            $month = $dateObj->format('m'); // March
            //Session::set('Month', $month);
            CalendarPage_Controller::curr()->getRequest()->getSession()->set('Month', $month);

            //$mnth = Session::get('Month');
            $mnth = CalendarPage_Controller::curr()->getRequest()->getSession()->get('Month');
            error_log(var_export($mnth, true));
        } else {
            if (!isset($_SESSION['Month'])) {
                $m = date("m");
                //Session::set('Month', $m);
                CalendarPage_Controller::curr()->getRequest()->getSession()->set('Month', $m);
            }
        }

        if (isset($urlParams->Year)) {
            //Session::set('Year', $urlParams->Year);
            CalendarPage_Controller::curr()->getRequest()->getSession()->set('Year', $urlParams->Year);

        } else {
            if (!isset($_SESSION['Year'])) {
                $y = date("Y");
                //Session::set('Year', $y);
                CalendarPage_Controller::curr()->getRequest()->getSession()->set('Year', $y);
            }
        }

        if (isset($urlParams->EID)) {
            //Session::set('EID', $urlParams->EID);
            CalendarPage_Controller::curr()->getRequest()->getSession()->set('EID', $urlParams->EID);
        }


//        // If session is not set, && no url params
//        if (!isset($_SESSION['Month'])) {
//            $m = date("m");
//            Session::set('Month', $m);
//        }
//
//        if (!isset($_SESSION['Year'])) {
//            $y = date("Y");
//            Session::set('Year', $y);
//        }
//
//        // Check if module session is active, if not set initialise the session variable and set it to 0
//        if(!isset($_SESSION['CALID'])){
//            Session::set('CALID', $this->CalendarID());
//        }

    }

    public function getURLParamaters()
    {
        $paramObj = new stdClass();

        $actual_link = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

        error_log(var_export($actual_link, true));

        $query = parse_url($actual_link, PHP_URL_QUERY);
        parse_str($query, $params);

        if (isset($_GET['Y'])) {
            $urlYear = $params['Y'];
            error_log(var_export($urlYear, true));
            $paramObj->Year = $urlYear;
        }
        if (isset($_GET['M'])) {
            $urlMonth = $params['M'];
            error_log(var_export($urlMonth, true));
            $paramObj->Month = $urlMonth;
        }
        if (isset($_GET['EID'])) {
            $urlEID = $params['EID'];
            error_log(var_export($urlEID, true));
            $paramObj->EID = $urlEID;
        }

        return $paramObj;

    }

    public function getSessionData()
    {
        $sessionData = new stdClass();
        if (isset($_SESSION['Year'])) {
            //$y = Session::get('Year');
            $y = CalendarPage_Controller::curr()->getRequest()->getSession()->get('Year');
            $sessionData->year = $y;
        }
        if (isset($_SESSION['Month'])) {
            //$m = Session::get('Month');
            $m = CalendarPage_Controller::curr()->getRequest()->getSession()->get('Month');
            $sessionData->month = $m;
        }
        if (isset($_SESSION['EID'])) {
            //$eID = Session::get('EID');
            $eID = CalendarPage_Controller::curr()->getRequest()->getSession()->get('EID');
            $sessionData->eID = $eID;
        }

        return json_encode($sessionData);

    }


    // Methods allowed to run on this controller
    private static $allowed_actions = array(
        'CommentForm',
        'AddEventForm',
        'processAddEvent',
        'jaxNextMonth',
        'jaxPreviousMonth',
        'currentYear',
        'currentMonthName',
        'nextShortMonth',
        'prevShortMonth',
        'resetCalendarDate',
        'tronTest',
        'EventTitle',
        'EventDescription',
        'EventLocation',
        'EventStartTime',
        'EventFinishTime',
        'EventDate',
        'associatedEventData',
        'resetApprovedModal',
        'getSessionData',
        'draw_calendar'
//        'searchHappEvents'
    );

    public function CalendarID()
    {
        return $this->ID;
    }

    /**
     * Get Tags associated With Calendar
     */
    public function CalendarTags()
    {
        $tags = SubTag::get();
        return $tags;
    }


    public function associatedEventData()
    {

        if (isset($_POST['EventID'])) {
            $eventID = $_POST['EventID'];
            $HappEvent = Event::get()->byID($eventID);

            $assocImages = $HappEvent->EventImages();
            $findaImages = $HappEvent->EventFindaImages();
            $tickets = $HappEvent->Tickets();
        }


        $priceArr = array();
        $minPrice = Null;
        $maxPrice = Null;
        foreach ($tickets as $ticket) {
            array_push($priceArr, $ticket->TicPrice);
        }
        if ($priceArr) {
            $minPrice = min($priceArr);
            $maxPrice = max($priceArr);
        }
        $date = new DateTime($HappEvent->EventDate);
//        $dateFormat = $date->format('Y-m-d H:i:s');
        $dateFormat = $date->format('d M Y');
        $startTime = new DateTime($HappEvent->StartTime);
        $startTimeFormat = $startTime->format('h:i a');
        $finishTime = new DateTime($HappEvent->FinishTime);
        $finishTimeFormat = $finishTime->format('h:i a');

        $StartToFinishTime = $startTimeFormat . ' - ' . $finishTimeFormat;

        $data = new ArrayData(array(
            'EventTitle' => $HappEvent->EventTitle,
            'EventDescription' => $HappEvent->EventDescription,
            'EventVenue' => $HappEvent->EventVenue,
            'LocationText' => $HappEvent->LocationText,
            'EventDate' => $dateFormat,
            'MinPrice' => $minPrice,
            'MaxPrice' => $maxPrice,
            'StartTime' => $startTimeFormat,
            'FinishTime' => $finishTimeFormat,
            'StartToFinishTime' => $StartToFinishTime,
            'IsFree' => $HappEvent->IsFree,
            'IsEventFindaEvent' => $HappEvent->IsEventFindaEvent,
            'SpecialEntry'   =>  $HappEvent->SpecEntry,
            'SpecialLocation'   =>  $HappEvent->SpecLocation,
            'TicketWebsite' => $HappEvent->TicketWebsite,
            'BookingWebsite' => $HappEvent->BookingWebsite,
            'TicketPhone' => $HappEvent->TicketPhone,
            'EventFindaURL' => $HappEvent->EventFindaURL,
            'EventImages' => $assocImages,
            'EventFindaImages' => $findaImages
        ));
        return $this->owner->customise($data)->renderWith('Event_Data_Modal');
        //echo $data->renderWith('Event_Data_Modal');
    }

    public function resetApprovedModal()
    {
        $html = '<div class="ajax-loader"><div class="ajax-load-icon"></div> </div>';
        return $html;
    }

    /**
     * Ajax | Return EventTitle for event modal
     */
    public function EventTitle()
    {
        $EventTitle = 'I need an Id';
        if (isset($_POST['EventID'])) {
            $eventID = $_POST['EventID'];
            $HappEvent = Event::get()->byID($eventID);
            $EventTitle = $HappEvent->EventTitle;
        }
        return $EventTitle;
    }

    public function currentMonth()
    {
        //$var = Session::get('Month'); // month session variable1
        $var = CalendarPage_Controller::curr()->getRequest()->getSession()->get('Month');
        return $var;
    }

    public function currentYear()
    {
        //$var = Session::get('Year'); // year session var
        $var = CalendarPage_Controller::curr()->getRequest()->getSession()->get('Year');
        return $var;
    }

    public function getTodaysMonth()
    {
        $today = date('m', strtotime(date('Y-m-d')));
        return $today;
    }

    /**
     * Day of the month without leading zeros
     */
    public function getTodaysday()
    {
        $today = date('j', strtotime(date('Y-m-d')));
        return $today;
    }

    public function currentMonthName()
    {
        //$mthNum = Session::get('Month'); // month session variable1
        $mthNum = CalendarPage_Controller::curr()->getRequest()->getSession()->get('Month');
        $dateObj = DateTime::createFromFormat('!m', $mthNum);
        $mthName = $dateObj->format('F'); // April

        return $mthName;
    }

    public function resetCalendarDate()
    {

        $m = date("m");
        $y = date("Y");
        //Session::set('Month', $m);
        //Session::set('Year', $y);
        CalendarPage_Controller::curr()->getRequest()->getSession()->set('Month', $m);
        CalendarPage_Controller::curr()->getRequest()->getSession()->set('Year', $y);

        $cal = $this->draw_calendar();
        //$this->reAddScripts();
        return $cal;
    }

    /**
     * @return string
     * Short month name for previous month
     */
    public function prevShortMonth()
    {
        //$mthNum = Session::get('Month'); // month session variable1
        $mthNum = CalendarPage_Controller::curr()->getRequest()->getSession()->get('Month');
        $mthNum--;
        $fMonthName = $this->formatMonth($mthNum);
        return $fMonthName;
    }

    /**
     * @return string
     * Short month name for next month
     */
    public function nextShortMonth()
    {
        //$mthNum = Session::get('Month'); // month session variable1
        $mthNum = CalendarPage_Controller::curr()->getRequest()->getSession()->get('Month');
        $mthNum++;
        $fMonthName = $this->formatMonth($mthNum);
        return $fMonthName;
    }

    /**
     * @return Calendar Body {previousMonth}
     */
    public function jaxPreviousMonth()
    {
        //Session::set('ModalCheck', 0);
        CalendarPage_Controller::curr()->getRequest()->getSession()->set('ModalCheck', 0);
        //$m = Session::get('Month');
        $m = CalendarPage_Controller::curr()->getRequest()->getSession()->get('Month');
        error_log('Ajax Prev Month');
        error_log(var_export($m, true));

        $m--;
        $this->formatMonthNumber($m);
        error_log('Ajax Prev Month after');
        error_log(var_export($m, true));

        $cal = $this->draw_calendar();
        //$this->reAddScripts();
        return $cal;
    }


    /**
     * @return Calendar Body {nextMonth}
     */
    public function jaxNextMonth()
    {
        //Session::set('ModalCheck', 0);
        CalendarPage_Controller::curr()->getRequest()->getSession()->set('ModalCheck', 0);
        //$m = Session::get('Month');
        $m = CalendarPage_Controller::curr()->getRequest()->getSession()->get('Month');
        $m++;
        $this->formatMonthNumber($m);
        $cal = $this->draw_calendar();
        //$this->reAddScripts();
        return $cal;
    }

    /**
     * Format long month{April} to short month{Apr}
     */
    public function formatMonth($m = '')
    {
        $dateObj = DateTime::createFromFormat('!m', $m);
        $shortMonth = $dateObj->format('M'); // April
        return $shortMonth;
    }

    /**
     * Format Month Number 2 = "02"
     */
    public function formatMonthNumber($m = '')
    {
        //$y = Session::get('Year');
        $y = CalendarPage_Controller::curr()->getRequest()->getSession()->get('Year');

        if ($m == 0) {
            $y--;
            $m = 12;
        } elseif ($m == 13) {
            $y++;
            $m = "01";
        } elseif ($m == 1) {
            $m = "01";
        } elseif ($m == 2) {
            $m = "02";
        } elseif ($m == 3) {
            $m = "03";
        } elseif ($m == 4) {
            $m = "04";
        } elseif ($m == 5) {
            $m = "05";
        } elseif ($m == 6) {
            $m = "06";
        } elseif ($m == 7) {
            $m = "07";
        } elseif ($m == 8) {
            $m = "08";
        } elseif ($m == 9) {
            $m = "09";
        } else {
            //$m = $m;
            // Leave $m alone
        }

        //Session::set('Month', $m);
        //Session::set('Year', $y);
        CalendarPage_Controller::curr()->getRequest()->getSession()->set('Month', $m);
        CalendarPage_Controller::curr()->getRequest()->getSession()->set('Year', $y);
        return;
    }

//    public function reAddScripts()
//    {
//        echo '<script src="'.$this->ThemeDir() .'/js/approved/approved-event.js"></script>';
//        return;
//    }

    /**
     * ToDo Query events by session month variable and test
     */

    /**
     * @return DataList of Events to Render on Calendar
     */
    public function getEvents()
    {
        //$currentMonth = Session::get('Month');
        //$currentYear = Session::get('Year');
        $currentMonth = CalendarPage_Controller::curr()->getRequest()->getSession()->get('Month');
        $currentYear = CalendarPage_Controller::curr()->getRequest()->getSession()->get('Year');
        $events = Event::get()
            ->where('EventApproved', 'TRUE')
            ->filter(array(
                'EventDate:PartialMatch' => '%' . $currentYear . '-' . $currentMonth . '-%'
            ))
            ->sort('EventDate', 'ASC'); // returns a 'DataList' containing all the 'Event' objects]


        return $events;

    }

//    public function searchHappEvents() {
//        $html = '<h1>Happ search results g</h1>';
//        return $html;
//    }

    function draw_calendar($m = '', $y = '')
    {

        $MonthIsToday = false;

        // $config is used for setting inline style colors
        $config = SiteConfig::current_site_config();

        //$m = Session::get('Month'); // $var = 3 from init function
        //$y = Session::get('Year');
        $m = CalendarPage_Controller::curr()->getRequest()->getSession()->get('Month');
        $y = CalendarPage_Controller::curr()->getRequest()->getSession()->get('Year');

        error_log('Draw date data');
        error_log(var_export($m, true));
        error_log(var_export($y, true));

        if ($m == $this->getTodaysMonth()) {
            $MonthIsToday = true;
        }

        $cmonth = $m;
        $cyear = $y;

        $month = $cmonth;
        $year = $cyear;
        //count days then store as days,weeks in the month
        $running_day = date('w', mktime(0, 0, 0, $month, 1, $year));
        $days_in_month = date('t', mktime(0, 0, 0, $month, 1, $year));
        $days_in_this_week = 1;
        $day_counter = 0;
        $dates_array = array();
        //store how many days are in a week
        for ($x = 0; $x < $running_day; $x++):
            $days_in_this_week++;
        endfor;
        //set counter to count rows
        $counterday = 1;
        for ($list_day = 1; $list_day <= $days_in_month; $list_day++):
            if ($running_day == 6):
                if (($day_counter + 1) != $days_in_month):
                    $counterday++;
                endif;
                $running_day = -1;
                $days_in_this_week = 0;
            endif;
            $days_in_this_week++;
            $running_day++;
            $day_counter++;
        endfor;
        //get row variables
        if ($counterday == 5) {
            $fcc = "five";
        }
        if ($counterday == 6) {
            $fcc = "six";
        }
        //print row variables
        $calendar = "<div class='fc-calendar fc-" . $fcc . "-rows'>";
        // reset calendar to do original count
        $running_day = date('w', mktime(0, 0, 0, $month, 1, $year));
        $days_in_month = date('t', mktime(0, 0, 0, $month, 1, $year));
        $days_in_this_week = 1;
        $day_counter = 0;
        $dates_array = array();
        /* table headings */
        $headings = array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
        $calendar .= '<div class="fc-head" style="background-color: ' . $config->SecondBarColor . ';"><div>' . implode('</div><div>', $headings) . '</div></div>';
        /* days and weeks vars now ... */
        /* start body fc-body */
        $calendar .= '<div class="fc-body">';
        /* row for week one */
        $calendar .= '<div class="fc-row 1">';
        /* print "blank" days until the first of the current week */
        $lastMonthDay = 1; // used for below function render last months days
        for ($x = 0; $x < $running_day; $x++):
            $calendar .= '<div class="day-square last-month-wrap">';
            $calendar .= '<span class="day-number last-month last-month-' . $lastMonthDay . '" style="">' . '</span></br>';
            $calendar .= '</div>';
            $lastMonthDay++;
            $days_in_this_week++;
        endfor;
        /* keep going with days.... */
        // GET THE EVENTS OBJECTS IN A DATALIST TO CALL OBJECT VARIABLEIS
        for ($list_day = 1; $list_day <= $days_in_month; $list_day++):
            $calendar .= '<div class="day-square">';
            $calendar .= '<div class="tron-inner-square">';
            if (($MonthIsToday == true) && ($list_day == $this->getTodaysday())) {
                $calendar .= '<div class="number-wrap"><span class="day-number current-day" style="">' . $list_day . '</span></div>';
            } else {
                $calendar .= '<div class="number-wrap"><span class="day-number" style="">' . $list_day . '</span></div>';
            }

            $events = $this->getEvents();
            if ($list_day == 1) {
                $convertday = "01";
            } elseif ($list_day == 2) {
                $convertday = "02";
            } elseif ($list_day == 3) {
                $convertday = "03";
            } elseif ($list_day == 4) {
                $convertday = "04";
            } elseif ($list_day == 5) {
                $convertday = "05";
            } elseif ($list_day == 6) {
                $convertday = "06";
            } elseif ($list_day == 7) {
                $convertday = "07";
            } elseif ($list_day == 8) {
                $convertday = "08";
            } elseif ($list_day == 9) {
                $convertday = "09";
            } else {
                $convertday = $list_day;
            }
            $sqDate = $year . '-' . $month . '-' . $convertday;

            //$calendar .= '<div class="opaque-head"></div>';
            $calendar .= '<div class="events-day-wrapper">';
            foreach ($events as $e) {

                if ($sqDate == $e->EventDate) {
                    /**
                     * Begin event button build
                     */
                    $calendar .= '<div class="event-btn" data-toggle="modal" data-target="#ApprovedEventModal" lat="' . $e->LocationLat . '" lon="' . $e->LocationLon . '" radius="' . $e->LocationRadius . '" EID="' . $e->ID . '" data-tag="' . $e->SecondaryTagID . '" ><a  class="happ_e_button">' . $e->EventTitle . '</a></div>';
                } else {
                    continue;
                }
            }
            $calendar .= '</div>';//close events-day-wrapper

            $calendar .= '<span class="fc-weekday">';
            $calendar .= '</span>';
            $calendar .= '</div>';
            $calendar .= '</div>';
            if ($running_day == 6):
                $calendar .= '</div>';
                if (($day_counter + 1) != $days_in_month):
                    $calendar .= '<div class="fc-row 2">';
                endif;
                $running_day = -1;
                $days_in_this_week = 0;
            endif;
            $days_in_this_week++;
            $running_day++;
            $day_counter++;
        endfor;
        /* finish the rest of the days in the week */
        if ($days_in_this_week < 8):
            $nextMonthDay = 1;
            for ($x = 1; $x <= (8 - $days_in_this_week); $x++):
                $calendar .= '<div class="day-square next-month-wrap">';
                $calendar .= '<span class="day-number next-month next-month-' . $nextMonthDay . '" style="">' . $nextMonthDay . '</span></br>';
                $calendar .= '</div>';
                $nextMonthDay++;
            endfor;
        endif;
        /* final row */
        $calendar .= '</div>';
        /* end body fc-body */
        $calendar .= '</div>';
        /* end the table */
        $calendar .= '</div>';
        /* end calendar */
        /* all done, return result */
        //$calendar.= '<script src="'.$this->ThemeDir() .'/js/locationpicker/locationpicker.jquery.min.js"></script>';
        //$this->ThemeDir() . "/js/locationpicker/locationpicker.jquery.min.js"

        return $calendar;
    }


}