/**
 * Created by Nicolas Fez for www.nicolasfez.com.
 * Started on 12/03/2025.
 */

import en from '../src/messages/en.json';
import fr from '../src/messages/fr.json';

const messagesByLocale: Record<string, unknown> = {en, fr};

const nextIntl = {
  defaultLocale: 'en',
  messagesByLocale,
};

export default nextIntl;
