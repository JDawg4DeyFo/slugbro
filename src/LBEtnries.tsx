import React from "react";
import { FlatList, View, Text } from 'react-native';

import StylesObj from './Styles'
const Styles = StylesObj.StylesObj;

// Data before server stuff is finished
const PREDEBUG = [
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },
    {
        id: 1,
        Name: 'JDawg',
        TotalBros: 420,
        Pfp: '../assets/SamplePFP.png'
    },

]
const DEBUG_DATA = PREDEBUG.map((item, index) => ({
    ...item,
    id: index.toString(),
}));
const DATA = DEBUG_DATA;


// Props of flatlist items
type EntryItemProps = {
    Name: string,
    TotalBros: number,
    Pfp: string,
};

// Object template to populate flatlist
const EntryItem = ({ Name, TotalBros, Pfp }: EntryItemProps) => {

}

const LBEntries = () => {
    return (
        <FlatList 
            data={DATA}
            renderItem={({item}) => <EntryItem Name={item.Name} TotalBros={item.TotalBros} Pfp={item.Pfp}/>}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator ={false}
        />
    )
}

export default LBEntries;