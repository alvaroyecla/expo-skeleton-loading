import React, { type ReactNode } from "react";
import { View, StyleSheet, type LayoutRectangle } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import Reanimated, { useSharedValue, withRepeat, useAnimatedStyle, withTiming, interpolate } from "react-native-reanimated";

type SkeletonLoadingProps = React.PropsWithChildren<{
    /**
     * background of the loader componenet hexcode
     */
    background: string;

    /**
     * highlight color of the loader component hexcode
     */
    highlight: string;
}>;


const SkeletonLoading = ({
        children,
        background,
        highlight
}: SkeletonLoadingProps) => {

    const [layout, setLayout] = React.useState<LayoutRectangle | null>(null);
    const shared = useSharedValue<number>(0);
    const maskedChildren: ReactNode = children ?? null;

    const animStyle = useAnimatedStyle(() => {
        const width = layout?.width ?? 0;
        const x = interpolate( shared.value, [0, 1], [ -width, width ], )
        return {
            transform: [ { translateX: x }, ]
        }
    });

    React.useEffect(() => {
        shared.value = withRepeat(
          withTiming(1, { duration: 1000 }),
          Infinity,
        );

    }, []);


    if (!layout) {
        return (
          <View onLayout={event => setLayout(event.nativeEvent.layout)}>
            {maskedChildren}
          </View>
        );
    }


    return(
        <MaskedView
            maskElement={maskedChildren}
            style={{ width: layout.width, height: layout.height }}
        >
            <View style={[styles.container, { backgroundColor: background }]} />

            <Reanimated.View
                style={[StyleSheet.absoluteFill, animStyle]}   
            >
                <MaskedView
                    style={StyleSheet.absoluteFill}
                    maskElement={
                        <LinearGradient 
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={StyleSheet.absoluteFill}
                            colors={['transparent', 'black', 'transparent']}
                        />
                    }
                >
                    <View style={[ StyleSheet.absoluteFill, { backgroundColor: highlight } ]} />
                </MaskedView>
            </Reanimated.View>
        </MaskedView>
    )
} 


export default SkeletonLoading;


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        overflow: 'hidden'
    }
})
