import * as React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';
import { compose, withHandlers } from 'recompose';

const Page2 = props => (
    <View style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    }}>
       <View style={{
            flex: 1,
            backgroundColor: '#333',
            padding: 12
        }}>
            <Text style={{
                color: '#FFFFFF'
            }}>Page 2</Text>
        </View>
        <View style={{
            height: '50px',
            width: '100%',
            backgroundColor: '#BBB',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <TouchableOpacity onPress={props.nextPage}>
                <View>
                    <Text>Page 3</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
);

export default compose(
    withHandlers({
        nextPage: props => _e => {
            props.setRoute({
                route: 'Page3',
                navigationTitle: "Page 3"
            });
        }
    })
)(Page2);