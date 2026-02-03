import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, ScrollView, Share, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../../components/CustomButton';
import { BorderRadius, Colors, Spacing } from '../../constants/theme';
import { useProfile } from '../../context/ProfileContext';
import { useColorScheme } from '../../hooks/use-color-scheme';

export default function MyProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const { width } = useWindowDimensions();
  const isTablet = width > 600;

  const { myProfile, updateMyProfile } = useProfile();

  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const [localProfile, setLocalProfile] = useState(myProfile);

  // Sync with context if it changes externally
  useEffect(() => {
    setLocalProfile(myProfile);
  }, [myProfile]);

  const profileUrl = `https://link-app.com/profile/${localProfile.id}`;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out my portfolio: ${profileUrl}`,
        url: profileUrl, // iOS only
      });
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSave = async () => {
    await updateMyProfile(localProfile);
    Alert.alert('Success', 'Profile updated effectively!');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      <StatusBar style="light" />

      {/* Refined Sticky Header */}
      <View style={[styles.stickyHeader, { backgroundColor: theme.primary }]}>
        <View style={styles.circleDecorator} />

        {/* Top Info Bar */}
        <View style={styles.headerTop}>
          <Text style={[styles.headerTitle, { color: theme.white }]}>My Portfolio</Text>
          <TouchableOpacity
            style={[styles.shareBtn, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
            onPress={() => setIsShareModalVisible(true)}
          >
            <Ionicons name="share-social-outline" size={20} color={theme.white} />
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* User Stats/Avatar Section inside sticky header */}
        <View style={styles.headerInfo}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarBorder}>
              <Image
                source={{ uri: localProfile.avatar }}
                style={styles.profileImg}
                resizeMode="cover"
              />
            </View>
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Ionicons name="camera" size={14} color={theme.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.userText}>
            <Text style={[styles.userName, { color: theme.white }]}>{localProfile.name}</Text>
            <Text style={[styles.userDomain, { color: 'rgba(255,255,255,0.9)' }]}>{localProfile.domain}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, isTablet && styles.tabletScroll]}
      >
        <View style={[styles.mainWrapper, isTablet && styles.tabletWrapper]}>
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.icon }]}>Full Name</Text>
              <TextInput
                style={[styles.input, { color: theme.text, borderColor: theme.border }]}
                value={localProfile.name}
                onChangeText={(text) => setLocalProfile({ ...localProfile, name: text })}
                placeholder="Enter your name"
                placeholderTextColor={theme.icon}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.icon }]}>Bio</Text>
              <TextInput
                style={[styles.input, styles.textArea, { color: theme.text, borderColor: theme.border }]}
                value={localProfile.bio}
                onChangeText={(text) => setLocalProfile({ ...localProfile, bio: text })}
                placeholder="Tell us about yourself"
                placeholderTextColor={theme.icon}
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.icon }]}>Domain / Profession</Text>
              <TextInput
                style={[styles.input, { color: theme.text, borderColor: theme.border }]}
                value={localProfile.domain}
                onChangeText={(text) => setLocalProfile({ ...localProfile, domain: text })}
                placeholder="e.g. Web Developer"
                placeholderTextColor={theme.icon}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.icon }]}>Skills (comma separated)</Text>
              <TextInput
                style={[styles.input, { color: theme.text, borderColor: theme.border }]}
                value={localProfile.skills}
                onChangeText={(text) => setLocalProfile({ ...localProfile, skills: text })}
                placeholder="e.g. React, Design, SEO"
                placeholderTextColor={theme.icon}
              />
            </View>

            <Text style={[styles.sectionTitle, { color: theme.text }]}>Social Links</Text>

            <View style={styles.socialInput}>
              <Ionicons name="logo-github" size={24} color={theme.text} />
              <TextInput
                style={[styles.input, { flex: 1, color: theme.text, borderColor: theme.border }]}
                value={localProfile.links.github}
                onChangeText={(text) => setLocalProfile({ ...localProfile, links: { ...localProfile.links, github: text } })}
                placeholder="GitHub URL"
                placeholderTextColor={theme.icon}
              />
            </View>

            <View style={styles.socialInput}>
              <Ionicons name="logo-linkedin" size={24} color={theme.text} />
              <TextInput
                style={[styles.input, { flex: 1, color: theme.text, borderColor: theme.border }]}
                value={localProfile.links.linkedin}
                onChangeText={(text) => setLocalProfile({ ...localProfile, links: { ...localProfile.links, linkedin: text } })}
                placeholder="LinkedIn URL"
                placeholderTextColor={theme.icon}
              />
            </View>

            <CustomButton
              title="Save Profile"
              onPress={handleSave}
              variant="primary"
              style={styles.saveBtn}
            />
          </View>
        </View>
      </ScrollView>

      {/* Share Modal */}
      <Modal
        visible={isShareModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsShareModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Share Your Portfolio</Text>
              <TouchableOpacity onPress={() => setIsShareModalVisible(false)}>
                <Ionicons name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.qrSection}>
              <View style={styles.qrCard}>
                {profileUrl ? (
                  <QRCode
                    value={profileUrl}
                    size={180}
                    color="#000"
                    backgroundColor="#FFF"
                  />
                ) : null}
              </View>
              <Text style={[styles.linkText, { color: theme.icon }]}>{profileUrl}</Text>
            </View>

            <View style={styles.modalActions}>
              <CustomButton
                title="Share"
                onPress={handleShare}
                variant="secondary"
                style={{ flex: 1 }}
              />
              <CustomButton
                title="Copy"
                onPress={() => Alert.alert('Copied!', 'Link copied to clipboard')}
                variant="primary"
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stickyHeader: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
    zIndex: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  circleDecorator: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    gap: 6,
  },
  shareText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarBorder: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#000',
    width: 26,
    height: 26,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#7C93FF',
  },
  userText: {
    flex: 1,
    gap: 2,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  userDomain: {
    fontSize: 15,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: 40,
  },
  tabletScroll: {
    alignItems: 'center',
  },
  mainWrapper: {
    width: '100%',
  },
  tabletWrapper: {
    maxWidth: 600,
  },
  form: {
    gap: Spacing.lg,
  },
  inputGroup: {
    gap: Spacing.xs,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: Spacing.md,
  },
  socialInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  saveBtn: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  modalContent: {
    width: '100%',
    maxWidth: 340,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 20,
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  qrSection: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  qrCard: {
    padding: Spacing.md,
    backgroundColor: '#FFF',
    borderRadius: BorderRadius.lg,
    minWidth: 200,
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.8,
  },
  modalActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    width: '100%',
  },
});
