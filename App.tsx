/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TextInput} from 'react-native';

import {MarkdownTextInput} from '@expensify/react-native-live-markdown';

function App(): React.JSX.Element {
  const [imageUri, setImageUri] = useState<string>('');
  const [mimeType, setMimeType] = useState<string>('');
  const handlePasteImage = (event: any) => {
    const {uri, mime, base64Source} = event.nativeEvent;
    setMimeType(mime);
    if (uri) {
      setImageUri(uri);
    } else if (base64Source) {
      setImageUri(base64Source);
    }
    console.log('___________  ___________', {uri, mime});
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView>
        <View style={{padding: 16, gap: 16}}>
          <TextInput
            style={[styles.input, {borderColor: 'blue'}]}
            placeholder="TextInput Default"
            placeholderTextColor="gray"
          />
          <TextInput
            style={[styles.input, {borderColor: 'red'}]}
            placeholder="TextInput Enabled Paste Image"
            placeholderTextColor="gray"
            onPasteImage={handlePasteImage}
          />
          <MarkdownTextInput
            multiline
            style={[styles.input, {borderColor: 'green', minHeight: 100}]}
            placeholder="Expensive Live Markdown Editor"
            placeholderTextColor="gray"
            onPasteImage={handlePasteImage}
          />
          {imageUri && (
            <View>
              <Text onPress={() => setImageUri('')}>Clear</Text>
              <Text>{mimeType}</Text>
              <Image
                source={{uri: imageUri}}
                style={{width: 200, height: 200, resizeMode: 'cover'}}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 8,
    borderColor: 'gray',
  },
});

export default App;
