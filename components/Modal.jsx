import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import { CameraIcon } from '@heroicons/react/outline'
import { db, storage } from '../firebase'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { ref, getDownloadURL, uploadString } from 'firebase/storage'

function Modal() {
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const filePickerRef = useRef(null)
  const captionRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const { data: session } = useSession()

  const uploadPost = async () => {
    if (loading) return

    setLoading(true)

    // 1) Create a post and add to fire store 'posts' collection
    // 2) Get the post ID for the newly created post
    // 3) Upload the image to firebase storage with the post ID
    // 4) Get a download URL from firebase storage and update the original post with image

    const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    })
    const imageRef = ref(storage, `posts/${docRef.id}/image`)
    await uploadString(imageRef, selectedFile, 'data_url').then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef)
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        })
      }
    )

    setIsOpen(false)
    setLoading(false)
    setSelectedFile(null)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-sm"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {selectedFile ? (
                  <img
                    className="w-full cursor-pointer object-contain"
                    src={selectedFile}
                    onClick={() => setSelectedFile(null)}
                    alt=""
                  />
                ) : (
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className="mx-auto flex h-12 w-12 
                items-center justify-center rounded-full bg-red-100"
                  >
                    <CameraIcon className="h-6 w-6 text-red-600" />
                  </div>
                )}

                <div className="mt-3 w-full text-center sm:mt-5">
                  Upload a photo
                </div>
              </Dialog.Title>
              <div className="mt-2">
                <input
                  onChange={addImageToPost}
                  ref={filePickerRef}
                  type="file"
                  hidden
                />
              </div>
              <div className="mt-2">
                <input
                  className="w-full border-none text-center focus:ring-0"
                  type="text"
                  placeholder="Please enter a caption..."
                  ref={captionRef}
                />
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border 
                  border-transparent bg-red-600 px-4 py-2 text-sm 
                  font-medium text-white hover:bg-red-500 
                  focus:outline-none focus-visible:ring-2 
                  focus-visible:ring-red-500 
                  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-600
                  hover:disabled:bg-gray-500"
                  disabled={!selectedFile}
                  onClick={uploadPost}
                >
                  {loading ? 'Uploading...' : 'Upload Post'}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
