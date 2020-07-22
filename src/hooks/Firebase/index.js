import { useEffect, useState } from 'react'
import { db } from 'services/firebase'

function useCollection(collection) {
  const [data, setData] = useState([])

  useEffect(() => {
    let mounted = true
    db.collection(collection).get().then(querySnapshot => {
      let arrayOfCollections = []
      querySnapshot.forEach(doc => {
        arrayOfCollections.push({
          id: doc.id,
          ...doc.data()
        })
      })

      if(mounted)
        setData(arrayOfCollections);
    })

    return () => {
      mounted = false;
    }
  }, [collection])

  console.log(data)

  return data;
}

export default useCollection
