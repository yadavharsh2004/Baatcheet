"use client";

import { cn, configureAssistant, getSubjectColor } from '@/lib/utils'
import { vapi } from '@/lib/vapi.sdk';
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import soundwaves from '@/constants/soundwaves.json'
import { addToSessionHistory } from '@/lib/actions/companion.actions';

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

const CompanionComponent = ({companionId, subject, topic, name, userName, userImage, style, voice}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE); 
  const [isSpeaking, setIsSpeaking] = useState(false); 
  const [isMuted, setIsMuted] = useState(false); 
  const [messages, setMessages] = useState<SavedMessage[]>([]); 

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const toggleMicrophone = () =>{
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);

    setIsMuted(!isMuted);
  }

  const handleCall = () => {
    setCallStatus(CallStatus.CONNECTING)

    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ['transcript'],
      serverMessages: [],
    }

    //@ts-expect-error
    vapi.start(configureAssistant(voice, style), assistantOverrides)
  }
  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED)
    vapi.stop();
  }

  useEffect(() => {
    if(lottieRef){
      if(isSpeaking){
        lottieRef.current?.play();
      }
      else{
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);
  

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () =>{
      setCallStatus(CallStatus.INACTIVE);
      addToSessionHistory(companionId);
      
    }
    
    const onMessage = (message : Message) => {
      if(message.type === 'transcript' && message.transcriptType === 'final'){
        const newMessage = {role: message.role , content: message.transcript}
        setMessages((prev) => [newMessage, ...prev]);
      }
    }
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    
    const onError = (error: Error) => console.log('Error: ', error);

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);
    vapi.on('error', onError);
    
    return () =>{ 
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
      vapi.off('error', onError);
    }
  }, [])
  

  return (
    <section className='flex flex-col h-[70vh] '>
      <section className='flex gap-8 max-sm:flex-col '>

        <div className='companion-section'>
          <div 
            className='companion-avatar' 
            style={{backgroundColor: getSubjectColor(subject)}}
          >
            {/* Subject img when call is NOT active  */}
            <div 
              className={
                cn('absolute transition-opacity duration-1000',
                  callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE? 'opacity-100': 'opacity-0',
                  callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse'
                )
              }
            >
              <Image 
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={150}
                height={150}
                className='max-sm:w-fit'
              />
            </div>

            {/* voice animation when call is active  */}
            <div className={ cn('absolute transition-opacity duration-1000',
                          callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0')}
            >
              <Lottie 
                lottieRef = {lottieRef}
                animationData={soundwaves}
                autoplay = {false}
                className='companion-lottie'
              />
            </div>

          </div>
          
          {/* Name of the ai bot (eg. Neura the brainy explorer) */}
          <p className='font-bold text-2xl'>{name}</p>  
        </div>

        <div className='user-section'>
          {/* User img and name */}
          <div className='user-avatar'>
              <Image src={userImage} alt={userName} width={130} height={130} 
                className='rounded-lg' />
              <p className='font-bold text-2xl'>{userName}</p>
          </div>

          {/* Mic on/off Button */}
          <button className='btn-mic' onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE}>
            <Image 
              src={isMuted? '/icons/mic-off.svg' : '/icons/mic-on.svg' }
              alt='mic'
              width={36}
              height={36}
            />

            <p className='max-sm:hidden '>
              {isMuted? 'Turn on microphone' : 'Turn off microphone'}
            </p>
          </button>

          {/* Start/End Call  */}
          <button 
            className={cn('rounded-lg py-2 cursor-pointer transition-colors w-full text-white',
            callStatus === CallStatus.ACTIVE? 'bg-red-700' : 'bg-primary',
            callStatus === CallStatus.CONNECTING && 'animate-pulse'
          )}
            onClick={callStatus === CallStatus.ACTIVE? handleDisconnect : handleCall}
          >
            {callStatus === CallStatus.ACTIVE
              ? "End Session"
              : callStatus === CallStatus.CONNECTING
                ? 'Connecting'
                : 'Start Session'
            }
          </button>
        </div>

      </section>

      <section className='transcript grow relative max-h-[calc(100vh-450px)]'>
          <div className='transcript-message '>
            {messages.map((message, index) => {
              if(message.role === 'assistant'){
                return(
                  <p key={index} className='max-sm:text-sm'>
                    {name.split(' ')[0].replace('/[.,]/g, ', '')} : {message.content}
                  </p>
                )
              }
              else{
                return (
                  <p key={index} className='text-primary max-sm:text-sm'>
                    {userName} : {message.content}
                  </p>
                )
              }
            })}
          </div>
          {isSpeaking?(
            <div className='transcript-fade' />
          ): null
          }   
      </section>

    </section> 
  )
}

export default CompanionComponent