import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";

//Lib
import PropTypes from "prop-types";
import posed from "react-native-pose";

//Mics Constants
import { styles } from "./AlertStyle";
import { Colors, Constants, Images, Responsive } from "../Theme";
import Icon from 'react-native-vector-icons/FontAwesome5';

//Pose View
let Modal = posed.View({
  enter: {
    y: 0,
    transition: {
      y: {
        ease: "linear",
        duration: 500,
        type: "spring",
        // stiffness: 30,
      },
    },
  },
  exit: {
    y: ({ y }) => -1 * y,
    transition: {
      y: {
        ease: "linear",
        duration: 500,
        type: "spring",
        // stiffness: 30,
      },
    },
  },
  props: { y: 500 },
});

const Circle = posed.View({
  big: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 1,
    },
  },
  normal: {
    scale: 1.0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 1,
    },
  },
});

let context = null;

class RNAlerter extends Component {
  constructor(props) {
    super(props);
    context = this;
    this.state = {
      isBig: false,
      alertTitle: "",
      alertMessage: "",
      alertHeight: Responsive.heightPercentageToDP("100%"),
      isVisible: false,
    };
  }

  componentDidMount() {
    const { alertTitle, alertMessage } = this.props;
    this.setState({
      alertTitle,
      alertMessage,
    });
  }

  componentDidUpdate(prevProps) {
    const { alertTitle, alertMessage } = this.props;
    if (
      alertTitle !== prevProps.alertTitle ||
      alertMessage !== prevProps.alertMessage
    ) {
      this.setState({
        alertTitle,
        alertMessage,
      });
    }
  }

  //Mics Method
  onLayoutView = (event) => {
    var { height } = event.nativeEvent.layout;
    this.setState({ alertHeight: height });
  };
  getPosition = (buttonPosition) => {
    let position = "";
    switch (buttonPosition) {
      case Constants.start:
        position = "flex-start";
        break;

      case Constants.center:
        position = "center";
        break;

      default:
        position = "flex-end";
    }
    return position;
  };

  static showAlert = () => {
    if (context) {
      context.onShowAlert();
    }
  };

  static showAlertWithOption = (title, message) => {
    if (context) {
      context.setState(
        {
          alertTitle: title,
          alertMessage: message,
        },
        () => {
          context.onShowAlert();
        }
      );
    }
  };

  static hideAlert = () => {
    if (context) {
      context.onHideAlert();
    }
  };

  static isAlertShowing = () => {
    if (context) {
      const { isVisible } = context.state;
      return isVisible;
    }
  };

  onShowAlert = () => {
    const {
      alertAutoHide,
      alertAutoHideDuration,
      alertLoadingVisible,
      alertAnimatedIcon,
      alertAnimatedIconDuration,
      alertButtonTitle,
      onAlertShow,
    } = this.props;
    this.setState(
      {
        isVisible: true,
      },
      () => {
        if (onAlertShow) onAlertShow();
      }
    );

    if (
      alertAutoHide &&
      !alertLoadingVisible &&
      alertButtonTitle &&
      alertButtonTitle.length <= 0
    ) {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.interval = setInterval(
        () => {
          this.onHideAlert();
        },
        alertAutoHideDuration > 0
          ? alertAutoHideDuration + Constants.minimumHideDuration
          : Constants.minimumHideDuration
      );
    }
    if (alertAnimatedIcon && !alertLoadingVisible) {
      if (this.intervalIcon) {
        clearInterval(this.intervalIcon);
      }
      this.intervalIcon = setInterval(() => {
        this.onChangeSize();
      }, alertAnimatedIconDuration);
    }
  };

  onHideAlert = () => {
    const { onAlertHide } = this.props;
    this.setState(
      {
        isVisible: false,
      },
      () => {
        if (onAlertHide) onAlertHide();
      }
    );
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.intervalIcon) {
      clearInterval(this.intervalIcon);
    }
  };

  onChangeSize = () => {
    this.setState((prevState) => ({
      isBig: !prevState.isBig,
    }));
  };

  //onPress Method
  onPressAlertView = () => {
    const { onPressAlert, alertLoadingVisible, alertTapToDismiss } = this.props;
    // const { alertTitle } = this.state;
    if (alertTapToDismiss && !alertLoadingVisible) {
      this.onHideAlert();
    } else if (!alertLoadingVisible && onPressAlert) {
      onPressAlert();
    }
  };

  onPressButtonOneView = () => {
    const { onPressButtonOne } = this.props;
    if (onPressButtonOne) {
      onPressButtonOne();
    }
    this.onHideAlert();
  };

  onPressButtonTwoView = () => {
    const { onPressButtonTwo } = this.props;
    if (onPressButtonTwo) {
      onPressButtonTwo();
    }
    this.onHideAlert();
  };

  //Render Method
  render() {
    const {
      isBig,
      isVisible,
      alertTitle,
      alertMessage,
      alertHeight,
    } = this.state;

    const {
      alertBGContainerStyle,
      alertBGColor,
      alertIconVisible,
      alertLoadingVisible,
      alertIconSource,
      alertVectorIcon,
      alertIconSize,
      alertAnimatedIcon,
      alertIconTintColor,
      alertIconResizeMode,
      alertTitleStyle,
      alertMessageStyle,
      alertButtonTitle,
      alertButtonPosition,
      alertButtonStyle,
      alertButtonTextStyle,
    } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={this.onPressAlertView}
        onLayout={this.onLayoutView}
      >
        <Modal
          style={styles.container}
          pose={isVisible ? "enter" : "exit"}
          y={isVisible ? 0 : alertHeight}
        >
          <View
            style={[
              styles.alertBGContainer,
              { backgroundColor: alertBGColor },
              alertBGContainerStyle,
            ]}
          >
            <View style={styles.alertMainContainer}>
              {alertLoadingVisible ? (
                <ActivityIndicator
                  style={[styles.imageStyle, { width: alertIconSize }]}
                  color={
                    alertIconTintColor !== ""
                      ? alertIconTintColor
                      : Colors.white
                  }
                  size="large"
                />
              ) : (
                alertIconVisible && (
                  <Circle
                    style={[styles.imageStyle, { width: alertIconSize }]}
                    pose={
                      alertAnimatedIcon ? (isBig ? "big" : "normal") : "normal"
                    }
                  >{
                    alertVectorIcon ?
                    <Icon 
                      name={alertVectorIcon.name || "check"} 
                      size={alertVectorIcon.size || 25} 
                      color={alertVectorIcon.color || "white"} 
                      style={{ 
                        width: alertVectorIcon.size || 25, 
                        height: alertVectorIcon.size || 25
                      }} 
                    />
                    : <Image
                    style={[
                      styles.imageMainStyle,
                      alertIconTintColor !== "" && {
                        tintColor: alertIconTintColor,
                      },
                    ]}
                    resizeMode={alertIconResizeMode}
                    source={alertIconSource}
                  />
                  } 
                  </Circle>
                )
              )}
              <View style={styles.alertTextContainer}>
                {alertTitle !== "" && (
                  <Text style={[styles.alertTitleStyle, alertTitleStyle]}>
                    {alertTitle}
                  </Text>
                )}
                {alertMessage !== "" && (
                  <Text style={[styles.alertMessageStyle, alertMessageStyle]}>
                    {alertMessage}
                  </Text>
                )}
              </View>
            </View>

            {!alertLoadingVisible &&
              alertButtonTitle &&
              alertButtonTitle.length > 0 && (
                <View
                  style={[
                    styles.alertButtonContainer,
                    { justifyContent: this.getPosition(alertButtonPosition) },
                  ]}
                >
                  <TouchableHighlight
                    style={[styles.alertButtonStyle, alertButtonStyle]}
                    underlayColor={alertBGColor}
                    onPress={this.onPressButtonOneView}
                  >
                    <Text
                      style={[
                        styles.alertButtonTextStyle,
                        alertButtonTextStyle,
                      ]}
                    >
                      {alertButtonTitle[0]}
                    </Text>
                  </TouchableHighlight>

                  {alertButtonTitle.length > 1 && (
                    <TouchableHighlight
                      style={[styles.alertButtonStyle, alertButtonStyle]}
                      underlayColor={alertBGColor}
                      onPress={this.onPressButtonTwoView}
                    >
                      <Text
                        style={[
                          styles.alertButtonTextStyle,
                          alertButtonTextStyle,
                        ]}
                      >
                        {alertButtonTitle[1]}
                      </Text>
                    </TouchableHighlight>
                  )}
                </View>
              )}
          </View>
        </Modal>
      </TouchableWithoutFeedback>
    );
  }
}

RNAlerter.propTypes = {
  alertBGContainerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number,
  ]),
  alertBGColor: PropTypes.string,
  alertIconVisible: PropTypes.bool,
  alertLoadingVisible: PropTypes.bool,
  alertIconSource: Image.propTypes.source,
  alertVectorIcon: PropTypes.object,
  alertIconSize: PropTypes.number,
  alertIconTintColor: PropTypes.string,
  alertIconResizeMode: PropTypes.oneOf([
    Constants.center,
    Constants.contain,
    Constants.cover,
    Constants.repeat,
    Constants.stretch,
  ]),
  alertAnimatedIcon: PropTypes.bool,
  alertAnimatedIconDuration: PropTypes.number,
  alertTitle: PropTypes.string,
  alertTitleStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number,
  ]),
  alertMessage: PropTypes.string,
  alertMessageStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number,
  ]),
  alertButtonTitle: PropTypes.array,
  alertButtonPosition: PropTypes.oneOf([
    Constants.start,
    Constants.center,
    Constants.end,
  ]),
  alertButtonStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number,
  ]),
  alertButtonTextStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number,
  ]),
  alertAutoHide: PropTypes.bool,
  alertAutoHideDuration: PropTypes.number,
  alertTapToDismiss: PropTypes.bool,
  onPressAlert: PropTypes.func,
  onPressButtonOne: PropTypes.func,
  onPressButtonTwo: PropTypes.func,
  onAlertShow: PropTypes.func,
  onAlertHide: PropTypes.func,
};

RNAlerter.defaultProps = {
  alertBGContainerStyle: {},
  alertBGColor: Colors.grayShadeA9,
  alertIconVisible: true,
  alertLoadingVisible: false,
  alertTitle: "",
  alertMessage: "",
  alertIconSource: Images.bell,
  alertVectorIcon: null,
  alertIconSize: 24,
  alertIconTintColor: "",
  alertIconResizeMode: Constants.center,
  alertAnimatedIcon: false,
  alertAnimatedIconDuration: Constants.animatedLogoDuration,
  alertButtonTitle: [],
  alertButtonPosition: Constants.end,
  alertAutoHide: true,
  alertAutoHideDuration: 2000,
  alertTapToDismiss: false,
  onPressAlert: () => {},
  onPressButtonOne: () => {},
  onPressButtonTwo: () => {},
  onAlertShow: () => {},
  onAlertHide: () => {},
};

export default RNAlerter;
