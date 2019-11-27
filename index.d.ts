// Type definitions for react-native-modal-dropdown 0.6
// Project: https://github.com/sohobloo/react-native-modal-dropdown
// Definitions by: Carlos Li <https://github.com/echoulen>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

import * as React from "react";

import Alert = RNAlert.Alert;
export = Alert;

declare namespace RNAlert {
  interface AlertProps {
    alertBGContainerStyle?: StyleSheet;
    alertBGColor?: String;
    alertIconVisible?: Boolean;
    alertLoadingVisible?: Boolean;
    alertIconSource?: any;
    alertIconSize?: Number;
    alertIconTintColor?: String;
    alertIconResizeMode?: ["center", "contain", "cover", "repeat", "stretch"];
    alertAnimatedIcon?: Boolean;
    alertTitle?: String;
    alertTitleStyle?: StyleSheet;
    alertMessage?: String;
    alertMessageStyle?: StyleSheet;
    alertButtonTitle?: Array<String>;
    alertButtonPosition?: ["start", "center", "end"];
    alertButtonStyle?: StyleSheet;
    alertButtonTextStyle?: StyleSheet;
    alertAutoHide?: Boolean;
    alertAutoHideDuration?: Number;
    alertTapToDismiss?: Boolean;
    onPressAlert?: () => void;
    onPressButtonOne?: () => void;
    onPressButtonTwo?: () => void;
    onAlertShow?: () => void;
    onAlertHide?: () => void;
  }

  class Alert extends React.Component<AlertProps> {
    static default: typeof Alert;
  }
}
