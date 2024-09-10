<template>
  <div class="privacy-policy">
    <h1>{{ t('title') }}</h1>
    <p><strong>{{ t('lastUpdated') }}</strong></p>

    <section>
      <h2>{{ t('section1.title') }}</h2>
      <p>
        <strong>{{ t('section1.personalInfo') }}</strong> 
        {{ t('section1.personalInfoDetail') }}
      </p>
      <p>
        <strong>{{ t('section1.usageInfo') }}</strong> 
        {{ t('section1.usageInfoDetail') }}
      </p>
      <p>
        <strong>{{ t('section1.cookies') }}</strong> 
        {{ t('section1.cookiesDetail') }}
      </p>
    </section>

    <section>
      <h2>{{ t('section2.title') }}</h2>
      <p>
        {{ t('section2.usageList') }}
        <ul>
          <li>{{ t('section2.list1') }}</li>
          <li>{{ t('section2.list2') }}</li>
          <li>{{ t('section2.list3') }}</li>
          <li>{{ t('section2.list4') }}</li>
          <li>{{ t('section2.list5') }}</li>
        </ul>
      </p>
    </section>

    <section>
      <h2>{{ t('section3.title') }}</h2>
      <p>
        {{ t('section3.sharingList') }}
        <ul>
          <li><strong>{{ t('section3.list1.title') }}</strong> {{ t('section3.list1.detail') }}</li>
          <li><strong>{{ t('section3.list2.title') }}</strong> {{ t('section3.list2.detail') }}</li>
          <li><strong>{{ t('section3.list3.title') }}</strong> {{ t('section3.list3.detail') }}</li>
        </ul>
      </p>
    </section>

    <section>
      <h2>{{ t('section4.title') }}</h2>
      <p>{{ t('section4.details') }}</p>
    </section>

    <section>
      <h2>{{ t('section5.title') }}</h2>
      <p>{{ t('section5.details') }}</p>
    </section>

    <section>
      <h2>{{ t('section6.title') }}</h2>
      <p>{{ t('section6.details') }}</p>
    </section>

    <section>
      <h2>{{ t('section7.title') }}</h2>
      <p>{{ t('section7.details') }}</p>
    </section>
  </div>
</template>

<script setup>
import { useTranslatePrivacyPolicy } from '../utils/useTranslate/useTranslatePrivacyPolicy';

const { t } = useTranslatePrivacyPolicy();

const cookiePolicyLink = '/cookie-policy';
</script>

<style scoped>
.privacy-policy {
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.privacy-policy h1 {
  text-align: center;
  margin-bottom: 1rem;
}

.privacy-policy section {
  margin-bottom: 2rem;
}

.privacy-policy h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.privacy-policy p {
  font-size: 1rem;
  line-height: 1.6;
}

.privacy-policy ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.privacy-policy a {
  color: #4CAF50;
  text-decoration: none;
}

.privacy-policy a:hover {
  text-decoration: underline;
}
</style>
