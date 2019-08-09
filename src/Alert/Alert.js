import React, { Component } from 'react';
import { Text, View, Image, ActivityIndicator, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';

//Lib
import PropTypes from 'prop-types';
import posed from 'react-native-pose';

//Mics Constants
import { styles } from './AlertStyle';
import { Colors, Constants, Images, Responsive } from '../Theme';

//Pose View
let Modal = posed.View({
  enter: {
    y: 0,
    transition: {
      y: {
        ease: 'linear',
        duration: 500,
        type: 'spring',
        stiffness: 30,
      },
    },
  },
  exit: {
    y: ({ y }) => -1 * y,
    transition: {
      y: {
        ease: 'linear',
        duration: 500,
        type: 'spring',
        stiffness: 30,
      },
    },
  },
  props: { y: 500 },
});

const Circle = posed.View({
  big: {
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 1,
    },
  },
  normal: {
    scale: 1.0,
    transition: {
      type: 'spring',
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
      alertHeight: Responsive.heightPercentageToDP('100%'),
      isVisible: false,
    };
  }

  //Mics Method
  onLayoutView = event => {
    var { height } = event.nativeEvent.layout;
    this.setState({ alertHeight: height });
  };
  getPosition = buttonPosition => {
    let position = '';
    switch (buttonPosition) {
      case Constants.start:
        position = 'flex-start';
        break;

      case Constants.center:
        position = 'center';
        break;

      default:
        position = 'flex-end';
    }
    return position;
  };

  static showAlert = () => {
    if (context) {
      context.onShowAlert();
    }
  };

  static hideAlert = () => {
    if (context) {
      context.onHideAlert();
    }
  };

  onShowAlert = () => {
    this.setState({
      isVisible: true,
    });
    const {
      alertAutoHide,
      alertAutoHideDuration,
      alertLoadingVisible,
      alertAnimatedIcon,
      alertButtonTitle,
    } = this.props;
    if (alertAutoHide && !alertLoadingVisible && alertButtonTitle && alertButtonTitle.length <= 0) {
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
      }, Constants.animatedLogoDuration);
    }
  };

  onHideAlert = () => {
    this.setState({
      isVisible: false,
    });
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.intervalIcon) {
      clearInterval(this.intervalIcon);
    }
  };

  onChangeSize = () => {
    this.setState(prevState => ({
      isBig: !prevState.isBig,
    }));
  };

  //onPress Method
  onPressAlertView = () => {
    const { onPressAlert, alertLoadingVisible, alertTapToDismiss } = this.props;
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
    const { isBig, isVisible, alertHeight } = this.state;

    const {
      alertBGColor,
      alertIconVisible,
      alertLoadingVisible,
      alertIconSource,
      alertIconSize,
      alertAnimatedIcon,
      alertIcoTintColor,
      alertTitle,
      alertTitleStyle,
      alertMessage,
      alertMessageStyle,
      alertButtonTitle,
      alertButtonPosition,
      alertButtonStyle,
      alertButtonTextStyle,
    } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.onPressAlertView} onLayout={this.onLayoutView}>
        <Modal style={styles.container} pose={isVisible ? 'enter' : 'exit'} y={isVisible ? 0 : alertHeight}>
          <View style={[styles.alertBGContainer, { backgroundColor: alertBGColor }]}>
            <View style={styles.alertMainContainer}>
              {alertLoadingVisible ? (
                <ActivityIndicator
                  style={[styles.imageStyle, { width: alertIconSize }]}
                  color={alertIcoTintColor || Colors.white}
                  size="large"
                />
              ) : (
                alertIconVisible && (
                  <Circle
                    style={[styles.imageStyle, { width: alertIconSize }]}
                    pose={alertAnimatedIcon ? (isBig ? 'big' : 'normal') : 'normal'}>
                    <Image
                      style={[styles.imageMainStyle, alertIcoTintColor && { tintColor: alertIcoTintColor }]}
                      resizeMode="center"
                      source={alertIconSource}
                    />
                  </Circle>
                )
              )}
              <View style={styles.alertTextContainer}>
                {alertTitle !== '' && <Text style={[styles.alertTitleStyle, alertTitleStyle]}>{alertTitle}</Text>}
                {alertMessage !== '' && (
                  <Text style={[styles.alertMessageStyle, alertMessageStyle]}>{alertMessage}</Text>
                )}
              </View>
            </View>

            {!alertLoadingVisible && alertButtonTitle && alertButtonTitle.length > 0 && (
              <View style={[styles.alertButtonContainer, { justifyContent: this.getPosition(alertButtonPosition) }]}>
                <TouchableHighlight
                  style={[styles.alertButtonStyle, alertButtonStyle]}
                  underlayColor={alertBGColor}
                  onPress={this.onPressButtonOneView}>
                  <Text style={[styles.alertButtonTextStyle, alertButtonTextStyle]}>{alertButtonTitle[0]}</Text>
                </TouchableHighlight>

                {alertButtonTitle.length > 1 && (
                  <TouchableHighlight
                    style={[styles.alertButtonStyle, alertButtonStyle]}
                    underlayColor={alertBGColor}
                    onPress={this.onPressButtonTwoView}>
                    <Text style={[styles.alertButtonTextStyle, alertButtonTextStyle]}>{alertButtonTitle[1]}</Text>
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
  alterBGColor: PropTypes.string,
  alertIconVisible: PropTypes.bool,
  alertLoadingVisible: PropTypes.bool,
  alertIconSource: Image.propTypes.source,
  alertIconSize: PropTypes.number,
  alertIcoTintColor: PropTypes.string,
  alertAnimatedIcon: PropTypes.bool,
  alertTitle: PropTypes.string,
  alertTitleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number]),
  alertMessage: PropTypes.string,
  alertMessageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number]),
  alertButtonTitle: PropTypes.array,
  alertButtonPosition: PropTypes.oneOf([Constants.start, Constants.center, Constants.end]),
  alertButtonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number]),
  alertButtonTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number]),
  alertAutoHide: PropTypes.bool,
  alertAutoHideDuration: PropTypes.number,
  alertTapToDismiss: PropTypes.bool,
  onPressAlert: PropTypes.func,
  onPressButtonOne: PropTypes.func,
  onPressButtonTwo: PropTypes.func,
};

RNAlerter.defaultProps = {
  alertBGColor: Colors.grayShadeA9,
  alertIconVisible: true,
  alertLoadingVisible: false,
  alertTitle: '',
  alertMessage: '',
  alertIconSource: Images.bell,
  alertIconSize: 24,
  alertAnimatedIcon: false,
  alertButtonTitle: [],
  alertButtonPosition: Constants.end,
  alertAutoHide: true,
  alertAutoHideDuration: 2000,
  alertTapToDismiss: false,
  onPressAlert: () => {},
  onPressButtonOne: () => {},
  onPressButtonTwo: () => {},
};

export default RNAlerter;
