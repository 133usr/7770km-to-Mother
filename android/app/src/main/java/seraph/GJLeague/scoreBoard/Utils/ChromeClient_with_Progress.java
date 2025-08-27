package seraph.GJLeague.scoreBoard.Utils;


import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.util.Log;
import android.view.View;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.FrameLayout;
import android.widget.ProgressBar;

import seraph.GJLeague.scoreBoard.R;

//for full screen of youtube videos -----------------
public class ChromeClient_with_Progress extends WebChromeClient {
    private final Activity activity;
    protected FrameLayout mFullscreenContainer;
    private View mCustomView;
    private WebChromeClient.CustomViewCallback mCustomViewCallback;
    private int mOriginalOrientation;
    private int mOriginalSystemUiVisibility;
    private final ProgressBar progressBar;
    private final String activity_name;


    public ChromeClient_with_Progress(ProgressBar progressBar, Activity activity) {
        this.progressBar = progressBar;
        this.activity = activity;
        this.activity_name = activity.getClass().getSimpleName();

    }


    @Override
    public void onProgressChanged(WebView view, int newProgress) {
        // Update the progress of the progress bar
        progressBar.setProgress(newProgress);

        // If the page loading is complete (progress is 100%), hide the progress bar
        if (newProgress == 100) {
            progressBar.setVisibility(View.GONE);
        } else {
            // If the page is still loading, show the progress bar
            progressBar.setVisibility(View.VISIBLE);
        }
    }

    @Override
    public boolean onCreateWindow(WebView view, boolean isDialog, boolean isUserGesture, android.os.Message resultMsg) {
        WebView newWebView = new WebView(view.getContext());
        newWebView.setWebViewClient(new WebViewClientWithNoNewWindow());
        ((WebView.WebViewTransport) resultMsg.obj).setWebView(newWebView);
        resultMsg.sendToTarget();
        return true;
    }

    //only for the Reset Watv Password Fragment

    public Bitmap getDefaultVideoPoster() {
        if (mCustomView == null) {
            return null;
        }
        return BitmapFactory.decodeResource(activity.getResources(), 2130837573);
    }

    public void onHideCustomView() {
        ((FrameLayout) activity.getWindow().getDecorView()).removeView(this.mCustomView);
        this.mCustomView = null;
        activity.getWindow().getDecorView().setSystemUiVisibility(this.mOriginalSystemUiVisibility);
        activity.setRequestedOrientation(this.mOriginalOrientation);
        this.mCustomViewCallback.onCustomViewHidden();
        this.mCustomViewCallback = null;
    }

    public void onShowCustomView(View paramView, WebChromeClient.CustomViewCallback paramCustomViewCallback) {
        if (this.mCustomView != null) {
            onHideCustomView();
            return;
        }
        this.mCustomView = paramView;
        this.mOriginalSystemUiVisibility = activity.getWindow().getDecorView().getSystemUiVisibility();
        this.mOriginalOrientation = activity.getRequestedOrientation();
        this.mCustomViewCallback = paramCustomViewCallback;
        ((FrameLayout) activity.getWindow().getDecorView()).addView(this.mCustomView, new FrameLayout.LayoutParams(-1, -1));
        activity.getWindow().getDecorView().setSystemUiVisibility(3846 | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
    }


    private class WebViewClientWithNoNewWindow extends android.webkit.WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, android.webkit.WebResourceRequest request) {
            view.loadUrl(request.getUrl().toString());
            return true;
        }
    }


}