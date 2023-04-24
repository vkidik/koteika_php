<?
    class DB{
        public static $DBServer = "localhost";
        public static $DBUser = "root";
        public static $DBPass = "";
        public static $DBName = "koteika";
        public static $DBLink;

        public static function init(){
            self::$DBLink = mysqli_connect(self::$DBServer, self::$DBUser, self::$DBPass, self::$DBName);
        }
        public static function Q($text){
            return mysqli_query(self::$DBLink, $text);
        }
        public static function F($text){
            return mysqli_fetch_array(self::Q($text));
        }
        public static function FA($text){
            return mysqli_fetch_all(self::Q($text), MYSQLI_ASSOC);
        }
    }
    DB::init();
?>