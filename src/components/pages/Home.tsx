/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 25/03/2025.
 */

import React, { FunctionComponent } from 'react'
import SplashAnimation from '@/components/animations/SplashAnimation'

const Home: FunctionComponent = () => (
  <div data-testid="home">
    <main>
      <SplashAnimation/>
    </main>
    <footer>
    </footer>
  </div>
)

Home.displayName = 'Home'

export default Home
