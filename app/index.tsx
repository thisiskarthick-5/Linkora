import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../components/CustomButton';
import { BorderRadius, Colors, Spacing } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';

// Optional import to prevent crash if not resolved
let BlurView: any;
try {
    BlurView = require('expo-blur').BlurView;
} catch (e) {
    BlurView = View; // Fallback
}

const { width, height } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        type: 'visual',
        title: 'Explore',
        description: 'Discover top professionals\nin your area instantly.',
        image: 'file:///C:/Users/karthick/.gemini/antigravity/brain/14a99e25-2dcd-446f-95a8-4e51eb7eef7b/onboarding_3d_asset_1770133518569.png',
        accent: '#7C93FF',
    },
    {
        id: '2',
        type: 'visual',
        title: 'Portfolio',
        description: 'Showcase your skills with\na professional digital presence.',
        image: 'file:///C:/Users/karthick/.gemini/antigravity/brain/14a99e25-2dcd-446f-95a8-4e51eb7eef7b/onboarding_3d_asset_1770133518569.png',
        accent: '#D49CFF',
    },
    {
        id: '3',
        type: 'content',
        title: 'Get Started',
        description: 'Start your journey today and\nlevel up your professional game.',
        image: 'file:///C:/Users/karthick/.gemini/antigravity/brain/14a99e25-2dcd-446f-95a8-4e51eb7eef7b/onboarding_3d_asset_1770133518569.png',
        accent: '#FFB167',
    },
];

export default function WelcomeScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef<FlatList>(null);
    const floatAnim = useRef(new Animated.Value(0)).current;

    // Floating animation
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, {
                    toValue: 20,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(floatAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    // Auto-swipe logic
    useEffect(() => {
        let timer: any;
        if (currentIndex < 2) {
            timer = setTimeout(() => {
                const nextIndex = currentIndex + 1;
                slidesRef.current?.scrollToIndex({
                    index: nextIndex,
                    animated: true,
                });
                setCurrentIndex(nextIndex);
            }, 3500);
        }
        return () => clearTimeout(timer);
    }, [currentIndex]);

    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems && viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const renderSlide = ({ item, index }: { item: typeof SLIDES[0], index: number }) => {
        const isLast = index === 2;

        return (
            <View style={[styles.slide, { backgroundColor: theme.background }]}>
                {/* Mesh Gradient Background */}
                <View style={styles.meshContainer}>
                    <View style={[styles.blob, { top: -100, left: -50, backgroundColor: Colors.light.primary, opacity: 0.15 }]} />
                    <View style={[styles.blob, { bottom: -150, right: -100, backgroundColor: Colors.light.secondary, opacity: 0.15 }]} />
                    <View style={[styles.blob, { top: height / 3, right: -50, backgroundColor: Colors.light.accent, opacity: 0.1 }]} />
                </View>

                <Animated.View style={[styles.imageContainer, { transform: [{ translateY: floatAnim }] }]}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.heroImage}
                        resizeMode="contain"
                    />
                </Animated.View>

                <View style={styles.bottomContent}>
                    <View style={styles.textColumn}>
                        <View style={[styles.accentLine, { backgroundColor: item.accent }]} />
                        <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
                        <Text style={[styles.description, { color: theme.text }]}>{item.description}</Text>

                        {isLast && (
                            <CustomButton
                                title="Start Exploring"
                                onPress={() => router.replace('/(tabs)/home')}
                                variant="primary"
                                style={styles.continueBtn}
                            />
                        )}
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top', 'bottom']}>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

            <Animated.FlatList
                data={SLIDES}
                renderItem={renderSlide}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                keyExtractor={(item) => item.id}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false,
                })}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={slidesRef}
                scrollEnabled={currentIndex === 2}
            />

            <View style={styles.paginator}>
                {SLIDES.map((_, i) => {
                    const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [8, 24, 8],
                        extrapolate: 'clamp',
                    });
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    });
                    return (
                        <Animated.View
                            key={i.toString()}
                            style={[
                                styles.dot,
                                { width: dotWidth, opacity, backgroundColor: SLIDES[i].accent },
                            ]}
                        />
                    );
                })}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slide: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 60,
    },
    meshContainer: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    blob: {
        position: 'absolute',
        width: width * 1.2,
        height: width * 1.2,
        borderRadius: width,
        filter: Platform.OS === 'web' ? 'blur(80px)' : undefined, // Native uses different approach or just opacity
    },
    imageContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
    },
    heroImage: {
        width: width * 0.9,
        height: width * 0.9,
    },
    bottomContent: {
        width: '100%',
        paddingHorizontal: Spacing.xl,
        paddingBottom: 40,
    },
    textColumn: {
        gap: Spacing.md,
        alignItems: 'flex-start',
    },
    accentLine: {
        width: 60,
        height: 6,
        borderRadius: 3,
        marginBottom: Spacing.xs,
    },
    title: {
        fontSize: 48,
        fontWeight: '900',
        letterSpacing: -1.5,
        lineHeight: 52,
        marginBottom: Spacing.xs,
    },
    description: {
        fontSize: 20,
        lineHeight: 28,
        opacity: 0.6,
        fontWeight: '500',
    },
    continueBtn: {
        marginTop: Spacing.xl,
        height: 64,
        borderRadius: BorderRadius.xl,
        width: '100%',
    },
    paginator: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 40,
        width: '100%',
    },
    dot: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
});
