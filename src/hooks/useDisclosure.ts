/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 06/03/2025.
 */
import { useCallback, useState } from 'react'

const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const onToggle = useCallback(() => {
    if (isOpen) {
      onClose()
    } else {
      onOpen()
    }
  }, [isOpen, onClose, onOpen])

  return { isOpen, onOpen, onClose, onToggle }
}

export default useDisclosure
