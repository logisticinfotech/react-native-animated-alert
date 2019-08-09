<p align="left">
    <a href="https://www.npmjs.com/package/@logisticinfotech/react-native-animated-alert"><img alt="npm version" src="https://img.shields.io/badge/npm-v1.0.0-green.svg"></a>
    <a href="https://www.npmjs.com/package/@logisticinfotech/react-native-animated-alert"><img src="https://img.shields.io/badge/downloads-%3E1K-yellow.svg"></a>
    <a href="https://www.npmjs.com/package/@logisticinfotech/react-native-animated-alert"<><img src="https://img.shields.io/badge/license-MIT-orange.svg"></a>
</p>

# react-native-animated-alert

### Installation and Usage

Please check this blog for installation and usage [this link](https://www.logisticinfotech.com/blog/react-native-animated-alert-library/)

![](RNAnimatedAlertIOS.gif)
![](RNAnimatedAlterAndroid.gif)

### Basic Properties

| Prop                  | Default   | Type                               | Description                                                                                                                |
| --------------------- | --------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| alterBGColor          | '#A9A9A9' | `string`                           | Alert background color.                                                                                                    |
| alertIconVisible      | true      | `bool`                             | Dispay or hide alert icon side to title.                                                                                   |
| alertLoadingVisible   | true      | `bool`                             | Show loading type alter.                                                                                                   |
| alertIconSource       | bellIcon  | `source`                           | Change the default bell icon. This will be not display id loading is visible.                                              |
| alertIconSize         | 24        | `number`                           | size of the alter icon.                                                                                                    |
| alertIcoTintColor     | '#FFFFFF' | `string`                           | color of the icon if source has transparent pixel.                                                                         |
| alertAnimatedIcon     | true      | `bool`                             | Icon of alert will be show animated.                                                                                       |
| alertTitle            | ''        | `string`                           | Display title of the alter.                                                                                                |
| alertTitleStyle       | InLibrary | `style`                            | Style of alter title display.                                                                                              |
| alertMessage          | ''        | `string`                           | Display message of the alter.                                                                                              |
| alertMessageStyle     | InLibrary | `style`                            | Style of alter message display.                                                                                            |
| alertButtonTitle      | []        | `array(string)`                    | Display the alert button. max is 2 buttons. This will be not display id loading is visible.                                |
| alertButtonPosition   | 'end'     | `enum of ['start','center','end']` | Style of the non selected date or time.                                                                                    |
| alertButtonStyle      | InLibrary | `style`                            | Style of the alert buttons.                                                                                                |
| alertButtonTextStyle  | InLibrary | `style`                            | Style of text of the alert buttons .                                                                                       |
| alertAutoHide         | true      | `bool`                             | Auto hide alter. This will be not display id loading is visible or button is visible                                       |
| alertAutoHideDuration | 2000      | `number`                           | Time in milisecond after alter auto hide if it enable. This will be not display id loading is visible or button is visible |
| alertTapToDismiss     | false     | `bool`                             | Hide alert on tap on it. This will be not display id loading is visible.                                                   |
| onPressAlert          | () => {}  | `function`                         | Call when click on the alter.                                                                                              |
| onPressButtonOne      | () => {}  | `function`                         | Call when button one(left button) is press.                                                                                |
| onPressButtonTwo      | () => {}  | `function`                         | Call when button two(right button) is press if has two buttons.                                                            |

