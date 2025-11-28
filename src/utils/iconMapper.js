// src/utils/iconMapper.js

import {
  Award,
  Users,
  Globe,
  TrendingUp,
  MapPin,
  Building2,
  Smartphone,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ExternalLink,
  ChevronRight,
  Play,
  Menu,
  X
} from 'lucide-react';

export const iconMap = {
  Award,
  Users,
  Globe,
  TrendingUp,
  MapPin,
  Building2,
  Smartphone,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ExternalLink,
  ChevronRight,
  Play,
  Menu,
  X
};

export const getIcon = (iconName) => {
  return iconMap[iconName] || null;
};