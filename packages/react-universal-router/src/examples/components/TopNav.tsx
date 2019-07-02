import * as React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

const TopNav = props => (
    !props.navbarHidden &&
    <View style={{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }}>
        {(props.history.length === 1) ? (
            <View style={{
                padding: 7
            }} />
        ) : (
            <TouchableOpacity onPress={props.navigateBack}>
                <View style={{
                    padding: 7
                }}>
                    <Text style={{
                        fontSize: 18
                    }}>{props.mode === 'modal' ? 'X' : '<'}</Text>
                </View>
            </TouchableOpacity>
        )}
        <Text>{props.routeTitle}</Text>
        <View style={{
            padding: 7
        }} />
    </View>
);

export default TopNav;