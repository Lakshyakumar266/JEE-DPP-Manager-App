import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const TabBar = ({ state, descriptors, navigation }) => {
    const primaryColor = '#0891b2';
    const activeColor = '#737373';

    const icons = {
        index: (props) => <AntDesign name="home" size={26} color={primaryColor} {...props} />,
        profile: (props) => <AntDesign name="user" size={26} color={primaryColor} {...props} />,
        upload: (props) => <AntDesign name="pluscircleo" size={32} color={primaryColor} {...props} />,
        cdps: (props) => <MaterialCommunityIcons name="file-document-outline" size={26} color={primaryColor} {...props} />,
        settings: (props) => <Ionicons name="settings-outline" size={26} color={primaryColor} {...props} />
    }

    return (
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                if (['_sitemap', '+not-found'].includes(route.name)) return null;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.name}
                        style={styles.tabBarItem}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}>
                        {
                            icons[route.name]({
                                color: isFocused ? primaryColor : activeColor
                            })
                        }
                        {
                            label === '' ? '' :
                                (<Text style={{
                                    color: isFocused ? primaryColor : activeColor,
                                    fontSize: 10
                                }}>
                                    {label}
                                </Text>)
                        }
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white for glass effect
        backdropFilter: 'blur(10px)', // Blur effect (might not work in React Native directly)
        marginHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1, // Optional border
        borderColor: 'rgba(255, 255, 255, 0.5)', // Light border for definition
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84
    },
    tabBarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2
    }
})

export default TabBar;
