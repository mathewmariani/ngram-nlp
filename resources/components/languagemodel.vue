<template>
  <div class="card">
    <div class="card-body">
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item">
          <a class="nav-link" id="pills-danish-tab" data-toggle="pill" href="#pills-danish" role="tab" aria-controls="pills-danish" aria-selected="false">Danish</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" id="pills-english-tab" data-toggle="pill" href="#pills-english" role="tab" aria-controls="pills-english" aria-selected="true">English</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="pills-french-tab" data-toggle="pill" href="#pills-french" role="tab" aria-controls="pills-french" aria-selected="false">French</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="pills-german-tab" data-toggle="pill" href="#pills-german" role="tab" aria-controls="pills-german" aria-selected="false">German</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="pills-swedish-tab" data-toggle="pill" href="#pills-swedish" role="tab" aria-controls="pills-swedish" aria-selected="false">Swedish</a>
        </li>
      </ul>

      <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane" id="pills-danish" role="tabpanel" aria-labelledby="pills-danish-tab">
          <frequency :language="danish"></frequency>
        </div>
        <div class="tab-pane show active" id="pills-english" role="tabpanel" aria-labelledby="pills-english-tab">
          <frequency :language="english"></frequency>
        </div>
        <div class="tab-pane" id="pills-french" role="tabpanel" aria-labelledby="pills-french-tab">
          <frequency :language="french"></frequency>
        </div>
        <div class="tab-pane" id="pills-german" role="tabpanel" aria-labelledby="pills-german-tab">
          <frequency :language="german"></frequency>
        </div>
        <div class="tab-pane" id="pills-swedish" role="tabpanel" aria-labelledby="pills-swedish-tab">
          <frequency :language="swedish"></frequency>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { unigram_danish } from '../mixins/unigram_da.js';
import { unigram_english } from '../mixins/unigram_en.js';
import { unigram_french } from '../mixins/unigram_fr.js';
import { unigram_german } from '../mixins/unigram_ge.js';
import { unigram_swedish } from '../mixins/unigram_sw.js';

export default {
  name: 'LanguageModel',
  mixins: [unigram_danish, unigram_english, unigram_french, unigram_german, unigram_swedish]
};
</script>