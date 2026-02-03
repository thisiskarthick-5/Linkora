import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoryChip } from '../../components/CategoryChip';
import { CourseSlider } from '../../components/CourseSlider';
import { ProfileCard } from '../../components/ProfileCard';
import { SearchBar } from '../../components/SearchBar';
import { BorderRadius, Colors, Spacing } from '../../constants/theme';
import { useProfile } from '../../context/ProfileContext';
import { useColorScheme } from '../../hooks/use-color-scheme';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: 'apps-outline' },
  { id: 'logic', label: 'Logic', icon: 'bulb-outline' },
  { id: 'visual', label: 'Visual', icon: 'eye-outline' },
  { id: 'focus', label: 'Focus', icon: 'timer-outline' },
  { id: 'web', label: 'Web', icon: 'code-outline' },
];

export default function DiscoveryScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { serviceProviders, myProfile } = useProfile();

  // Combine my profile with other providers for the search/filter list
  const allProviders = useMemo(() => [myProfile, ...serviceProviders], [myProfile, serviceProviders]);

  // Filtering Logic
  const filteredData = useMemo(() => {
    return allProviders.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.domain.toLowerCase().includes(search.toLowerCase());

      const categoryMatch =
        selectedCategory === 'all' ||
        item.domain.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === 'logic' && item.domain.toLowerCase().includes('edit')) || // Specific mock mapping
        (selectedCategory === 'visual' && item.domain.toLowerCase().includes('design'));

      return matchesSearch && categoryMatch;
    });
  }, [allProviders, search, selectedCategory]);

  const numColumns = width > 600 ? 3 : 2;

  const renderHeader = () => (
    <View style={styles.listHeader}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Featured Courses</Text>
        <TouchableOpacity>
          <Text style={{ color: theme.primary, fontWeight: '600' }}>See All</Text>
        </TouchableOpacity>
      </View>

      <CourseSlider />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll} contentContainerStyle={{ paddingLeft: Spacing.md }}>
        {CATEGORIES.map((cat) => (
          <CategoryChip
            key={cat.id}
            label={cat.label}
            icon={cat.icon as any}
            selected={selectedCategory === cat.id}
            onPress={() => setSelectedCategory(cat.id)}
          />
        ))}
      </ScrollView>

      <View style={[styles.sectionHeader, { marginTop: Spacing.sm }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Service Providers</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <StatusBar barStyle="light-content" />

      <View style={[styles.stickyHeader, { backgroundColor: theme.primary }]}>
        <View style={styles.circleDecorator} />

        <View style={styles.topBar}>
          <View style={styles.userSection}>
            <View style={[styles.avatarPlaceholder, { backgroundColor: 'rgba(255,255,255,0.3)' }]}>
              <Ionicons name="person" size={24} color={theme.white} />
            </View>
            <View>
              <Text style={[styles.greeting, { color: theme.white }]}>Hello, {myProfile.name.split(' ')[0]}</Text>
              <Text style={[styles.subGreeting, { color: 'rgba(255,255,255,0.8)' }]}>Service Discovery</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.notificationBtn, { borderColor: 'rgba(255,255,255,0.3)' }]}>
            <Ionicons name="notifications-outline" size={24} color={theme.white} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        <SearchBar
          value={search}
          onChangeText={setSearch}
          style={styles.searchBar}
          placeholder="Search for providers..."
        />
      </View>

      <FlatList
        key={numColumns}
        data={filteredData}
        renderItem={({ item }) => (
          <ProfileCard
            name={item.name}
            domain={item.domain}
            avatar={item.avatar}
            color={item.color || theme.primary}
            onPress={() => router.push({ pathname: '/profile/[id]', params: { id: item.id } } as any)}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  stickyHeader: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
    zIndex: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  circleDecorator: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatarPlaceholder: {
    width: 45,
    height: 45,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subGreeting: {
    fontSize: 14,
    fontWeight: '500',
  },
  notificationBtn: {
    width: 45,
    height: 45,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: '#FF5C5C',
    borderWidth: 1.5,
    borderColor: '#7C93FF',
  },
  searchBar: {
    marginHorizontal: Spacing.md,
    backgroundColor: '#FFF',
  },
  listHeader: {
    paddingTop: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoriesScroll: {
    marginBottom: Spacing.md,
  },
  listContent: {
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
});
