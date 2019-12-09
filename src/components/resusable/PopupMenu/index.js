import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import {
   Menu,
   MenuOptions,
   MenuOption,
   MenuTrigger,
} from 'react-native-popup-menu'
import { COLORS } from '../../../config'

const PopupMenu = ({ triggerText, menuItems }) => (
   <Menu>
      <MenuTrigger
         text={triggerText || 'EDIT'}
         customStyles={{ triggerText: { color: COLORS.GRAY } }}
      />
      <MenuOptions>
         {menuItems.map((item, index) => (
            <MenuOption key={index.toString()} onSelect={item.onSelect}>
               <Text style={{ color: item.color || COLORS.BLACK }}>
                  {item.title}
               </Text>
            </MenuOption>
         ))}
      </MenuOptions>
   </Menu>
)

export { PopupMenu }
