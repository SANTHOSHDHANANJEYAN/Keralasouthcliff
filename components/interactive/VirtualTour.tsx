'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Maximize, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const VirtualTour = ({ villaType = 'ground-floor' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRoom, setCurrentRoom] = useState('bedroom');
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const rooms = [
    { id: 'bedroom', name: 'Master Bedroom', image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg' },
    { id: 'bathroom', name: 'Luxury Bathroom', image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg' },
    { id: 'living', name: 'Living Area', image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg' },
    { id: 'terrace', name: villaType === 'ground-floor' ? 'Private Terrace' : 'Private Balcony', image: 'https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg' },
  ];

  const currentRoomData = rooms.find(room => room.id === currentRoom);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          {/* Main Tour View */}
          <div className="relative h-96 bg-gradient-to-br from-blue-100 to-teal-100">
            <img 
              src={currentRoomData?.image} 
              alt={currentRoomData?.name}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay Controls */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-white/90 backdrop-blur-sm rounded-full p-4"
              >
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="rounded-full w-16 h-16"
                >
                  {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                </Button>
              </motion.div>
            </div>

            {/* Top Controls */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
              <Badge className="bg-white/90 text-gray-900">
                Virtual Tour - {villaType === 'ground-floor' ? 'Ground Floor' : 'Top Floor'} Villa
              </Badge>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                  className="bg-white/90 hover:bg-white"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="bg-white/90 hover:bg-white"
                >
                  <Maximize size={16} />
                </Button>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <h3 className="font-semibold text-gray-900">{currentRoomData?.name}</h3>
                <p className="text-sm text-gray-600">
                  {currentRoom === 'bedroom' && 'King-size bed with premium linens and ocean views'}
                  {currentRoom === 'bathroom' && 'Marble bathroom with rainfall shower and luxury amenities'}
                  {currentRoom === 'living' && 'Spacious living area with modern furnishings'}
                  {currentRoom === 'terrace' && `Private ${villaType === 'ground-floor' ? 'terrace' : 'balcony'} with stunning beach views`}
                </p>
              </div>
            </div>
          </div>

          {/* Room Navigation */}
          <div className="p-4 bg-gray-50">
            <div className="flex gap-2 overflow-x-auto">
              {rooms.map((room) => (
                <Button
                  key={room.id}
                  variant={currentRoom === room.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentRoom(room.id)}
                  className="whitespace-nowrap"
                >
                  {room.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Tour Progress */}
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Tour Progress</span>
              <span>{rooms.findIndex(r => r.id === currentRoom) + 1} / {rooms.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((rooms.findIndex(r => r.id === currentRoom) + 1) / rooms.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Interactive Hotspots */}
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-4 h-4 bg-blue-600 rounded-full cursor-pointer shadow-lg"
              onClick={() => {/* Handle hotspot click */}}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VirtualTour;