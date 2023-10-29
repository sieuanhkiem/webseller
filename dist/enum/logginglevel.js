"use strict";
var LevelLog;
(function (LevelLog) {
    LevelLog[LevelLog["ERROR"] = 0] = "ERROR";
    LevelLog[LevelLog["WARN"] = 1] = "WARN";
    LevelLog[LevelLog["INFO"] = 2] = "INFO";
    LevelLog[LevelLog["VERBOSE"] = 3] = "VERBOSE";
    LevelLog[LevelLog["DEBUG"] = 4] = "DEBUG";
    LevelLog[LevelLog["SILLY"] = 5] = "SILLY";
})(LevelLog || (LevelLog = {}));
