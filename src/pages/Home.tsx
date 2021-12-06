import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList, 
} from "react-native";

import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

interface IMySkill {
  id: string; 
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState<string>("");
  const [mySkills, setMySkills] = useState<IMySkill[]>([]);
  const [gretting, setGretting] = useState<string>(''); 

  function handleAddSkill() {
    const data = {
      id: String(new Date().getTime()), 
      name: newSkill,
    }

    setMySkills((oldState) => [...oldState, data]);
  }

  function removeSkill(id: string) {
    setMySkills(oldState => oldState.filter( skill => skill.id !== id)); 
  }

  useEffect(() => {
    const currentHour = new Date().getHours(); 

    if(currentHour < 12) {
      setGretting('Good Morning'); 
    } else if( currentHour >= 12 && currentHour < 18){
      setGretting('Good Afternoon'); 
    } else {
      setGretting('Good Evening');
    }
  }, [mySkills]); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Vitor</Text>

      <Text style={styles.greetings}>{gretting}</Text>

      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button onPress={handleAddSkill} title='Add' />

      <Text style={[styles.title, { marginVertical: 40 }]}>My Skills</Text>

      <FlatList 
        data={mySkills}
        keyExtractor={(item, index) => item.id}
        renderItem={( {item} ) => (
          <SkillCard 
            skill={item.name} 
            onPress={() => removeSkill(item.id)}
          />
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121025",
    paddingHorizontal: 20,
    paddingVertical: 70,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#1F1E25",
    color: "#FFF",
    fontSize: 18,
    padding: Platform.OS === "ios" ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  buttonSkill: {
    backgroundColor: "#1f1e25",
    padding: 10,
    borderRadius: 50,
    marginTop: 10,
  },
  skill: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  greetings: {
    color: '#FFFFFF',
  }
});
