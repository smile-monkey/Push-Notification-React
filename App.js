/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity
} from 'react-native';

GLOBAL = require('./Globals');

var PushNotification = require('react-native-push-notification');

type Props = {};
export default class App extends Component<Props> {

    componentWillMount() {
        PushNotification.configure({

            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function(token) {
                console.log( 'TOKEN:', token );
                if(token !== undefined) {
                  GLOBAL.PUSH_TOKEN = token['token'];
                  alert(token['token']);
                }
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
                console.log( 'NOTIFICATION:', notification );
                // process the notification
                
                // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
                // notification.finish(PushNotification.FetchResult.NoData);
            },

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
              * (optional) default: true
              * - Specified if permissions (ios) and token (android and ios) will requested or not,
              * - if not, you must call PushNotificationsHandler.requestPermissions() later
              */
            requestPermissions: true,
        });

    }

    send_notification() {
        console.log('push notification');
        console.log(GLOBAL.PUSH_TOKEN);
        fetch(`http://pushnotif-dev.serverdatahost.com/apns/?message=hello&device_token=`+GLOBAL.PUSH_TOKEN, {
            method: 'GET'
        })
        .then(res => res)
        .then(res => {
            alert('sent');
            console.log(res);
        })
        .catch(res => {
            alert('failed');
            console.log(res);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.fb_button} onPress={this.send_notification} >
                    <Text style={{color: '#ffffff', fontSize: 16, fontWeight: 'bold', paddingTop: 5}}> click for push notification </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    fb_button: {
        backgroundColor: "#4267B2",
        height: 30,
        width: 200,
        alignItems: 'center'
    }
});
