import React from 'react'

const TitleAvatarSkeleton = () => {
    return (
        <div className="flex items-center space-x-4 animate-pulse">
          <div className="rounded-full bg-gray-200 w-16 h-16" />
          <div className="space-y-2">
            <div className="rounded bg-gray-200 h-5 w-32" />
            <div className="rounded bg-gray-200 h-3 w-24" />
          </div>
        </div>
      )
}

export default TitleAvatarSkeleton
