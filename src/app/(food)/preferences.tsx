import MultiSectionRadio, {
    type FoodLanguageElement,
} from '@/components/Elements/Food/FoodLanguageSection'
import FormList from '@/components/Elements/Universal/FormList'
import { chevronIcon } from '@/components/Elements/Universal/Icon'
import MultiSectionPicker from '@/components/Elements/Universal/MultiSectionPicker'
import SectionView from '@/components/Elements/Universal/SectionsView'
import SingleSectionPicker from '@/components/Elements/Universal/SingleSectionPicker'
import { type Colors } from '@/components/colors'
import { FoodFilterContext } from '@/components/contexts'
import { type FormListSections } from '@/types/components'
import { PAGE_PADDING } from '@/utils/style-utils'
import { useTheme } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

export default function FoodPreferences(): JSX.Element {
    const { t } = useTranslation('food')
    const elemtents = [
        {
            key: 'IngolstadtMensa',
            title: t('cards.titles.mensa', { ns: 'navigation' }),
        },
        {
            key: 'Reimanns',
            title: t('cards.titles.reimanns', { ns: 'navigation' }),
        },
        {
            key: 'Canisius',
            title: t('cards.titles.canisius', { ns: 'navigation' }),
        },
        {
            key: 'NeuburgMensa',
            title: t('cards.titles.mensaNeuburg', { ns: 'navigation' }),
        },
    ]

    const languages: FoodLanguageElement[] = [
        {
            key: 'default',
            title: t('preferences.languages.auto'),
        },
        { key: 'de', title: t('preferences.languages.de') },
        { key: 'en', title: t('preferences.languages.en') },
    ]
    const colors = useTheme().colors as Colors
    const router = useRouter()

    const {
        selectedRestaurants,
        toggleSelectedRestaurant,
        showStatic,
        toggleShowStatic,
        foodLanguage,
        toggleFoodLanguage,
    } = useContext(FoodFilterContext)

    const sections: FormListSections[] = [
        {
            header: 'Labels',
            items: [
                {
                    title: t('preferences.formlist.allergens'),
                    icon: chevronIcon,
                    onPress: () => {
                        router.push('(food)/allergens')
                    },
                },
                {
                    title: t('preferences.formlist.flags'),
                    icon: chevronIcon,
                    onPress: () => {
                        router.push('(food)/flags')
                    },
                },
            ],
        },
    ]

    return (
        <ScrollView>
            <View style={styles.container}>
                <SectionView title={'Restaurants'}>
                    <MultiSectionPicker
                        elements={elemtents}
                        selectedItems={selectedRestaurants}
                        action={toggleSelectedRestaurant}
                    />
                </SectionView>
                <SectionView title={'Filter'}>
                    <SingleSectionPicker
                        title={t('preferences.formlist.static')}
                        selectedItem={showStatic}
                        action={toggleShowStatic}
                    />
                </SectionView>
                <View style={{ ...styles.sectionContainer }}>
                    <FormList sections={sections} />
                </View>
                <SectionView title={t('preferences.formlist.language')}>
                    <MultiSectionRadio
                        elements={languages}
                        selectedItem={foodLanguage}
                        action={toggleFoodLanguage}
                    />
                </SectionView>
            </View>
            <View style={styles.notesBox}>
                <Text
                    style={[
                        styles.notesText,
                        {
                            color: colors.labelColor,
                        },
                    ]}
                >
                    {t('preferences.footer')}
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    sectionContainer: {
        marginTop: 16,
        paddingHorizontal: PAGE_PADDING,
        width: '100%',
        alignSelf: 'center',
    },
    notesBox: {
        width: '92%',
        alignSelf: 'center',
        paddingTop: 16,
        paddingBottom: 32,
    },
    notesText: {
        fontSize: 11,
        fontWeight: 'normal',
        paddingTop: 8,
        textAlign: 'left',
    },
})
