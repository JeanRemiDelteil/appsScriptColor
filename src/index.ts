import "./__webComponents";
// webComponents import MUST BE FIRST
import { NavigationDetection, NavigationEvent } from "./feature-detection";
import { MonacoSetup } from "./setup";

NavigationDetection.init({
    [NavigationEvent.SCRIPT_OPEN]: ({ scriptKey }) =>
        MonacoSetup.init(scriptKey),
    [NavigationEvent.SCRIPT_CLOSE]: () => MonacoSetup.destroy(),
});
