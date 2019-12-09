import * as RNFS from 'expo-file-system'

const saveImage = (docID, imageData) => {
   const path = `${RNFS.documentDirectory}${docID}`

   RNFS.writeAsStringAsync(path, imageData)
   RNFS.readDirectoryAsync(RNFS.documentDirectory).then(res =>
      console.log(res, docID),
   )
}

const copyImage = async (docID, imagePath) => {
   const newPath = RNFS.documentDirectory + `/${docID}`

   await RNFS.copyAsync({ from: imagePath, to: newPath })
   RNFS.readDirectoryAsync(RNFS.documentDirectory).then(res =>
      console.log(res, docID),
   )
}

const displayImage = fileName => ({
   uri: `file:///${RNFS.DocumentDirectoryPath}${fileName}`,
})

const readFileContents = docID => {
   console.log(`Reading ${docID} image contents`)
   RNFS.readAsStringAsync(`${RNFS.documentDirectory}${docID}`).then(res =>
      console.log(res),
   )
}

export { saveImage, copyImage, displayImage, readFileContents }
